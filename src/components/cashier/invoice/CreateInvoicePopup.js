import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import InvoiceDescription from './InvoiceDescription';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import { invoiceApi, uploadInvoice } from '../api/CashierAPI';
import { CURRENCY } from '../../constants';
import TextArea from '../../shared/TextArea';

function CreateInvoicePopup(props) {
  const [offeringList, setOfferingList] = React.useState(props.offeringlist);
  const [taxList, setTaxList] = React.useState(props.taxlist);
  const [itemList, setItemList] = React.useState([
    {
      item_id: '',
      quantity: 0,
      tax_id: '',
      total_amount: 0,
    },
  ]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1 < 10 ? `0${today.getMonth()}` : today.getMonth()
  }-${today.getDate() + 1 < 10 ? `0${today.getDate()}` : today.getDate()}`;

  const addNewItem = () => {
    setItemList([
      ...itemList,
      {
        item_id: '',
        quantity: 0,
        tax_id: '',
        total_amount: 0,
      },
    ]);
  };

  const deleteItem = (index) => {
    setItemList(itemList.filter((sindex, ind) => ind !== index));
  };

  const handleItemIdChange = (id, index) => {
    const itemL = [...itemList];
    itemL[index].item_id = id;
    setItemList(itemL);
  };

  const handleQuantityChange = (quantity, amount, index) => {
    const itemL = [...itemList];
    itemL[index].quantity = quantity;
    itemL[index].total_amount = amount;
    setItemList(itemL);
  };

  const handleTaxIdChange = (id, amount, index) => {
    const itemL = [...itemList];
    itemL[index].tax_id = id;
    itemL[index].total_amount = amount;
    setItemList(itemL);
  };

  const handleTotalAmount = (prev, next) => {
    setTotalAmount(totalAmount - prev + next);
  };

  const resteTotalAmount = () => {
    setTotalAmount(0);
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
          due_date: props.invoice.due_date || '',
          bill_period: props.invoice.bill_period || '',
          bill_date: props.invoice.bill_date || date,
          description: props.invoice.description || '',
          mobile: props.invoice.mobile || '',
          ccode: props.invoice.ccode || '',
          items: [],
        }}
        onSubmit={async (values) => {
          values.items = itemList;
          values.amount = totalAmount;
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
      >
        {(formikProps) => {
          const {
            values,
            isSubmitting,
            handleChange,
            handleBlur,
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
                  </Col>
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
                </Row>
                <InvoiceDescription
                  offeringlist={offeringList}
                  taxlist={taxList}
                  totalamount={handleTotalAmount}
                  addnewitem={addNewItem}
                  deleteitem={deleteItem}
                  itemidchange={handleItemIdChange}
                  quantitychange={handleQuantityChange}
                  taxidchange={handleTaxIdChange}
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
                      <label className="focused">Bill Period</label>
                      <TextInput
                        type="date"
                        format="dd-mm-yyyy"
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
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="33%">
                    <FormGroup>
                      <label className="focused">Due Date</label>
                      <TextInput
                        type="date"
                        format="dd-mm-yyyy"
                        name="due_date"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={values.due_date}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  disabled={isSubmitting}
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
