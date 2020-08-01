import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { number } from 'prop-types';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import InvoiceDescription from './InvoiceDescription';
import SelectInput from '../../shared/SelectInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import {
  invoiceApi,
  uploadInvoice,
  getBillPeriods,
  getBillTerms,
} from '../api/CashierAPI';
import { CURRENCY, API_URL } from '../../constants';
import TextArea from '../../shared/TextArea';

function CreateInvoicePopup(props) {
  const [offeringList, setOfferingList] = React.useState(props.offeringlist);
  const [taxList, setTaxList] = React.useState(props.taxlist);
  const [isLoading, setLoading] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [itemList, setItemList] = React.useState([
    {
      item_code: '',
      quantity: 0,
      tax_code: '',
      total_amount: 0,
    },
  ]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [defaultBillPeriod, setDefaultBillPeriod] = React.useState(
    props.defaultperiod,
  );
  const [billTermList, setBilltermList] = React.useState(props.termlist);
  const [defaultBillTerm, setDefaultBillTerm] = React.useState(
    props.defaultterm,
  );
  const [countryList, setCountryList] = React.useState(props.countrylist);
  const [defaultCountry, setDefaultCountry] = React.useState(
    props.defaultcountry,
  );
  const [totalAmountWithoutTax, setTotalAmountWithoutTax] = React.useState(0);
  const [totalTax, setTotalTax] = React.useState(0);
  const today = new Date();
  const date = `${
    today.getDate() + 1 < 10 ? `0${today.getDate()}` : today.getDate()
  }/${
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
  }/${today.getFullYear()}`;

  const addNewItem = () => {
    setItemList([
      ...itemList,
      {
        item_code: '',
        quantity: 0,
        tax_code: '',
        total_amount: 0,
      },
    ]);
  };

  const deleteItem = (index) => {
    setItemList(itemList.filter((sindex, ind) => ind !== index));
  };

  const handleItemCodeChange = (code, index) => {
    const itemL = [...itemList];
    itemL[index].item_code = code;
    setItemList(itemL);
  };

  const handleQuantityChange = (quantity, amount, index) => {
    const itemL = [...itemList];
    itemL[index].quantity = quantity;
    itemL[index].total_amount = amount;
    setItemList(itemL);
  };

  const handleTaxCodeChange = (code, amount, index) => {
    const itemL = [...itemList];
    itemL[index].tax_code = code;
    itemL[index].total_amount = amount;
    setItemList(itemL);
  };

  const handleTotalAmount = (prev, next) => {
    setTotalAmount(totalAmount - prev + next);
  };

  const handleTotalAmountWithoutTax = (prev, next) => {
    setTotalAmountWithoutTax(totalAmountWithoutTax - prev + next);
  };

  const handleTotalTax = (prev, next) => {
    setTotalTax(totalTax - prev + next);
  };

  const resteTotalAmount = () => {
    setTotalAmount(0);
  };

  const getUser = (e) => {
    if (e) {
      if (e.target.value.length === 10) {
        return new Promise((resolve, reject) => {
          axios
            .post(`${API_URL}/cashier/getUserFromMobile`, {
              mobile: e.target.value,
            })
            .then((res) => {
              if (res.data.error || res.data.status !== 1) {
                resolve(false);
                setUserName('');
                return false;
              }
              console.log(res.data.data.name);
              setUserName(res.data.data.name);
            })
            .catch((err) => {
              resolve(false);
            });
        });
      }
      return false;
    }
    return false;
  };

  const termNameSelectInput = () => {
    return billTermList.map((val, index) => {
      // if (defaultBillTerm.name === val.name) {
      //   return (
      //     <option key={val.name} value={index} selected>
      //       {val.name}
      //     </option>
      //   );
      // }
      return (
        <option key={val.name} value={index}>
          {val.name}
        </option>
      );
    });
  };

  const countrySelectInput = () => {
    return countryList.map((val, index) => {
      return (
        <option key={val.ccode} value={index}>
          {val.ccode}
        </option>
      );
    });
  };

  useEffect(() => {
    correctFocus(props.type);
  });

  return (
    <Popup accentedH1 bigBody close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          number: props.invoice.number || '',
          name: props.invoice.name || '',
          amount: props.invoice.amount || '',
          bill_period: props.invoice.bill_period || '',
          bill_term: '',
          bill_date: props.invoice.bill_date || date,
          description: props.invoice.description || '',
          mobile: props.invoice.mobile || '',
          ccode: props.invoice.ccode || '',
          items: [],
        }}
        onSubmit={async (values) => {
          if (userName !== '') {
            values.name = userName;
          }
          values.items = itemList;
          values.amount = totalAmount;
          const due = new Date();
          due.setDate(due.getDate() + billTermList[values.bill_term].days);
          values.due_date = `${
            due.getDate() + 1 < 10 ? `0${due.getDate()}` : due.getDate()
          }/${
            due.getMonth() + 1 < 10
              ? `0${due.getMonth() + 1}`
              : due.getMonth() + 1
          }/${due.getFullYear()}`;
          console.log(values.due_date);
          values.bill_period = defaultBillPeriod;
          console.log(values);
          if (props.type === 'create') {
            const payload = {
              group_id: props.groupId,
              invoices: [values],
            };
            await uploadInvoice(props, payload);
          } else {
            values.invoice_id = props.invoice._id;
            values.group_id = props.groupId;
            await invoiceApi(props, values, 'update');
          }
        }}
        // validationSchema={Yup.object().shape({
        //   mobile: Yup.string()
        //     .min(10, 'number should be atleast 10 digits')
        //     .max(10, 'number cannot exceed 10 digits')
        //     .matches(
        //       /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        //       'Mobile no must be valid',
        //     )
        //     .required('Mobile no is required')
        //     .test(
        //       // 'WalletCheck',
        //       // 'Wallet for this number does not exist!',
        //       (value) => getUser(value),
        //     ),
        // })}
      >
        {(formikProps) => {
          const {
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = formikProps;

          return (
            <div>
              <h1>
                {props.type === 'update' ? 'Edit Invoice' : 'Create Invoice'}
              </h1>
              <Form>
                <Row>
                  <Col cW="10%" mR="2%">
                    <FormGroup>
                      <SelectInput
                        name="ccode"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={values.ccode}
                        onChange={handleChange}
                        required
                      >
                        {countrySelectInput()}
                      </SelectInput>
                    </FormGroup>
                  </Col>
                  <Col cW="40%">
                    <FormGroup>
                      <label>Mobile Number*</label>
                      <TextInput
                        type="text"
                        pattern="[0-9]{10}"
                        title="10 Digit numeric value"
                        name="mobile"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={values.mobile}
                        onChange={(e) => {
                          handleChange(e);
                          getUser(e);
                        }}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="10%" mR="2%">
                    <FormGroup>
                      <label>Bill No*</label>
                      <TextInput
                        type="text"
                        name="number"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={values.number}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="40%" mR="2%">
                    {userName === '' ? (
                      <FormGroup>
                        <label>Name*</label>
                        <TextInput
                          type="text"
                          name="name"
                          onFocus={(e) => {
                            handleChange(e);
                            inputFocus(e);
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                            handleChange(e);
                            inputBlur(e);
                          }}
                          value={values.name}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <label className="focused">Name*</label>
                        <TextInput
                          type="text"
                          name="name"
                          value={values.name}
                          onFocus={(e) => {
                            handleChange(e);
                            inputFocus(e);
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                            handleChange(e);
                            inputBlur(e);
                          }}
                          placeholder={userName}
                        />
                      </FormGroup>
                    )}
                  </Col>
                </Row>
                <InvoiceDescription
                  offeringlist={offeringList}
                  taxlist={taxList}
                  totalamount={handleTotalAmount}
                  addnewitem={addNewItem}
                  deleteitem={deleteItem}
                  totalamountwithouttax={handleTotalAmountWithoutTax}
                  totaltax={handleTotalTax}
                  itemcodechange={handleItemCodeChange}
                  quantitychange={handleQuantityChange}
                  taxcodechange={handleTaxCodeChange}
                  reset={resteTotalAmount}
                ></InvoiceDescription>
                <Row>
                  <Col cW="33%" mR="2%">
                    <FormGroup>
                      <label className="focused">Bill Date</label>
                      <TextInput
                        type="text"
                        name="bill_date"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={date}
                        placeholder={date}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="33%" mR="2%">
                    <FormGroup>
                      <label className="focused">Bill Period*</label>
                      <TextInput
                        type="text"
                        name="bill_period"
                        value={defaultBillPeriod.period_name}
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        placeholder={defaultBillPeriod.period_name}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="33%" mR="2%">
                    <FormGroup>
                      <SelectInput
                        name="bill_term"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={values.bill_term}
                        onChange={handleChange}
                        defaultValue={2}
                        required
                      >
                        <option value="">Select Term</option>
                        {termNameSelectInput()}
                      </SelectInput>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col cW="75%"></Col>
                  <Col cW="25%">
                    <Row style={{ marginTop: '7px', fontSize: '18px' }}>
                      <Col cW="50%">Total Amount</Col>
                      <Col cW="50%">{totalAmountWithoutTax}</Col>
                    </Row>
                    <Row style={{ marginTop: '7px', fontSize: '18px' }}>
                      <Col cW="50%">Total Tax</Col>
                      <Col cW="50%">{totalTax}</Col>
                    </Row>
                    <Row style={{ marginTop: '7px', fontSize: '18px' }}>
                      <Col cW="50%">Sum Total</Col>
                      <Col cW="50%">{totalAmount}</Col>
                    </Row>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  filledBtn
                  marginTop="10px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                    <span>
                      {' '}
                      {props.type === 'update'
                        ? 'Update Invoice'
                        : 'Create Invoice'}
                    </span>
                  )}
                  <span> Total XOF {totalAmount}</span>
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default CreateInvoicePopup;
