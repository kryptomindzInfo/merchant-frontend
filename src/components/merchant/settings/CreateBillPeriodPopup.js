import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormField from '../../shared/FormField';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import ErrorText from '../../shared/ErrorText';
import { addBillPeriod } from '../api/MerchantAPI';
import TextArea from '../../shared/TextArea';

function CreateBillPeriodPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  }, []);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1> {props.type === 'update' ? 'Update Bill Term' : 'Add Bill Term'}</h1>
      <Formik
        initialValues={{
          start_date: props.billperiod.start_date || '',
          end_date: props.billperiod.end_date || '',
          period_name: props.billperiod.period_name || '',
        }}
        onSubmit={async (values) => {
          values.zone_id = props.zoneId;
          if (props.type === 'update') {
            console.log('in process');
          } else {
            await addBillPeriod(props, values);
          }
        }}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormGroup>
                  <label className="focused">Start Date</label>
                  <TextInput
                    type="date"
                    format="dd-mm-yyyy"
                    name="start_date"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="focused">End Date</label>
                  <TextInput
                    type="date"
                    format="dd-mm-yyyy"
                    name="end_date"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Period Name*</label>
                  <Field
                    type="text"
                    name="period_name"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="period_name" component={ErrorText} />
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
                        : 'Add Bill Period'}
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

export default CreateBillPeriodPopup;
