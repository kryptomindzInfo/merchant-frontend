import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import { createCounterInvoice } from '../api/CashierAPI';

function CounterInvoicePopup(props) {
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          counter_invoice_number: '',
          description: '',
          amount: '',
        }}
        onSubmit={async (values) => {
          values.invoice_id = props.invoiceId;
          await createCounterInvoice(props, values);
        }}
        validationSchema={Yup.object().shape({
          counter_invoice_number: Yup.string().required(
            'Invoice Number is required',
          ),
          description: Yup.string().required('Description is required'),
          amount: Yup.string().required('Amount no is required'),
        })}
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
              <h1>Counter Invoice</h1>
              <Form>
                <FormGroup>
                  <label>Counter Invoice Number*</label>
                  <TextInput
                    type="text"
                    name="counter_invoice_number"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.counter_invoice_number}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Description*</label>
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
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Amount*</label>
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
                    <span>Raise Counter Invoice</span>
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

export default CounterInvoicePopup;
