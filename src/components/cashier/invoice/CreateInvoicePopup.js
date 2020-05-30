import React from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';

function CreateInvoicePopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          bill_no: props.invoice.bill_no || '',
          description: props.invoice.description || '',
          customer_id: props.invoice.customer_id || '',
          amount: props.invoice.amount || '',
          mobile: props.invoice.mobile || '',
          due_date: props.invoice.due_date || '',
        }}
        onSubmit={{}}
      >
        {(formikProps) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleFocus,
            setFieldValue,
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
                    name="bill_no"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={values.bill_no}
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
                        readOnly
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
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={values.mobile}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <label>Customer ID*</label>
                  <TextInput
                    type="text"
                    name="customer_id"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={values.customer_id}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Description</label>
                  <TextInput
                    type="text"
                    name="description"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={values.description}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Due Date</label>
                  <TextInput
                    type="text"
                    name="due_date"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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
