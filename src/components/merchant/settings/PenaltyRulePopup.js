import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormField from '../../shared/FormField';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import SelectInput from '../../shared/SelectInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import ErrorText from '../../shared/ErrorText';
import { PenaltyRule } from '../api/MerchantAPI';

function PenaltyRulePopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  }, []);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1>Edit Penalty Rule</h1>
      <Formik
        initialValues={{
          type: props.penaltyrule ? props.penaltyrule.type : '',
          fixed_amount: props.penaltyrule ? props.penaltyrule.fixed_amount : '',
          percentage: props.penaltyrule ? props.penaltyrule.percentage : '',
        }}
        onSubmit={async (values) => {
          console.log(values);
          await PenaltyRule(props, values);
        }}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormField textAlign="start" mB="14px" background="#fff">
                  <label htmlFor="type" className="focused">
                    Type*
                  </label>
                  <Field
                    type="text"
                    name="type"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    as={SelectInput}
                    required
                  >
                    <option value="">Select period</option>
                    <option value="once">Flat Penalty</option>
                    <option value="perday">Per Day Penalty</option>
                  </Field>
                  <ErrorMessage name="type" component={ErrorText} />
                </FormField>
                <FormField textAlign="start" mB="14px" background="#fff">
                  <label className="focused" htmlFor="fixed_amount">Fixed Amount*</label>
                  <Field
                    type="number"
                    name="fixed_amount"
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
                  <ErrorMessage name="fixed_amount" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label className="focused" htmlFor="percentage">Percentage*</label>
                  <Field
                    type="number"
                    name="percentage"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="percentage" component={ErrorText} />
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

export default PenaltyRulePopup;
