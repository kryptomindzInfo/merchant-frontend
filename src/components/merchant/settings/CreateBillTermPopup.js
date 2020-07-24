import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormField from '../../shared/FormField';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import ErrorText from '../../shared/ErrorText';
import { addBillTerm } from '../api/MerchantAPI';
import TextArea from '../../shared/TextArea';

function CreateBillTermPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  }, []);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1> {props.type === 'update' ? 'Update Bill Term' : 'Add Bill Term'}</h1>
      <Formik
        initialValues={{
          days: props.billterm.days || '',
          name: props.billterm.name || '',
        }}
        onSubmit={async (values) => {
          values.zone_id = props.zoneId;
          if (props.type === 'update') {
            console.log('in process');
          } else {
            await addBillTerm(props, values);
          }
        }}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormField textAlign="start" mB="14px" background="#fff">
                  <label htmlFor="cdays">Days*</label>
                  <Field
                    type="number"
                    name="days"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="days" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Name*</label>
                  <Field
                    type="text"
                    name="name"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="name" component={ErrorText} />
                </FormField>
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
                      {props.type === 'update'
                        ? 'Update Bill Term'
                        : 'Add Bill Term'}
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

export default CreateBillTermPopup;
