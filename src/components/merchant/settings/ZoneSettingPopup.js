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
import { ZoneDetails } from '../api/MerchantAPI';
import TextArea from '../../shared/TextArea';

function ZoneSettingPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  }, []);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1> Edit Zone and Subzone name </h1>
      <Formik
        initialValues={{
          zone_name: '',
          subzone_name: '',
        }}
        onSubmit={async (values) => {
          await ZoneDetails(props, values);
        }}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormField textAlign="start" mB="14px" background="#fff">
                  <label htmlFor="cdays">Zone Name*</label>
                  <Field
                    type="text"
                    name="zone_name"
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
                  <ErrorMessage name="zone_name" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Subzone Name*</label>
                  <Field
                    type="text"
                    name="subzone_name"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="subzone_name" component={ErrorText} />
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
                    <span>Submit</span>
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

export default ZoneSettingPopup;
