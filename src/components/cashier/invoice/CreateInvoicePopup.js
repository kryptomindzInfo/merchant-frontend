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
  const [billPeriodList, setBillPeriodList] = React.useState(props.periodlist);
  const [billTermList, setBillTermList] = React.useState(props.termlist);
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1 < 10 ? `0${today.getMonth()}` : today.getMonth()
  }-${today.getDate() + 1 < 10 ? `0${today.getDate()}` : today.getDate()}`;

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

  const resteTotalAmount = () => {
    setTotalAmount(0);
  };

  const getUser = (value) => {
    if (value) {
      if (value.length === 10) {
        return new Promise((resolve, reject) => {
          axios
            .post(`${API_URL}/cashier/getUserFromMobile`, {
              mobile: value,
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

  const periodNameSelectInput = () => {
    return billPeriodList.map((val, index) => {
      return (
        <option key={val.period_name} value={index}>
          {val.period_name}
        </option>
      );
    });
  };

  const termNameSelectInput = () => {
    return billTermList.map((val, index) => {
      return (
        <option key={val.name} value={index}>
          {val.name}
        </option>
      );
    });
  };

  useEffect(() => {
    correctFocus(props.type);
    console.log(props.periodlist);
  });

  return (
    <Popup accentedH1 bigBody close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          number: props.invoice.number || '',
          name: props.invoice.name || '',
          amount: props.invoice.amount || '',
          bill_period: props.invoice.bill_period || '',
          bill_term: props.invoice.bill_term || '',
          bill_date: props.invoice.bill_date || date,
          description: props.invoice.description || '',
          mobile: props.invoice.mobile || '',
          ccode: props.invoice.ccode || '',
          items: [],
        }}
        onSubmit={async (values) => {
          values.items = itemList;
          values.amount = totalAmount;
          const due = new Date(values.bill_date);
          due.setDate(due.getDate() + billTermList[values.bill_term].days);
          values.due_date = `${due.getFullYear()}-${
            due.getMonth() + 1
          }-${due.getDate()}`;
          console.log(values.due_date);
          values.bill_period = billPeriodList[values.bill_period];
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
                      <label>Country Code*</label>
                      <TextInput
                        type="text"
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
                      />
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
                        onChange={handleChange}
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
                          value={userName}
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
                        type="date"
                        format="dd-mm-yyyy"
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
                        value={values.bill_date}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="33%" mR="2%">
                    <FormGroup>
                      <SelectInput
                        name="bill_period"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={values.bill_period}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Period</option>
                        {periodNameSelectInput()}
                      </SelectInput>
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
                        required
                      >
                        <option value="">Select Term</option>
                        {termNameSelectInput()}
                      </SelectInput>
                    </FormGroup>
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
