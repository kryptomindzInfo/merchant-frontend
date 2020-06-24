import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import { invoiceApi, uploadInvoice } from '../api/CashierAPI';

function CreateInvoicePopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  });

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          number: props.invoice.number || '',
          name: props.invoice.name || '',
          amount: props.invoice.amount || '',
          due_date: props.invoice.due_date || '',
          description: props.invoice.description || '',
          mobile: props.invoice.mobile || '',
          ccode: props.invoice.ccode || '',
        }}
        onSubmit={async (values) => {
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
                <FormGroup>
                  <label>Bill No*</label>
                  <TextInput
                    type="number"
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
                <Row>
                  <Col cW="20%" mR="2%">
                    <FormGroup>
                      <TextInput
                        type="text"
                        name="ccode"
                        value={values.ccode}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="78%">
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
                <FormGroup>
                  <label>Description</label>
                  <TextInput
                    type="text"
                    name="description"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.description}
                    onChange={handleChange}
                  />
                </FormGroup>
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
                <FormGroup>
                  <label>Amount</label>
                  <TextInput
                    type="text"
                    name="amount"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.amount}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
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
