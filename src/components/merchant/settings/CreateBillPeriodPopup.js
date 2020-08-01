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
    console.log(props.startdate);
  }, []);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      {props.type === 'update' ? <h1>Update Period</h1> : <h1>Add Period</h1>}
      <Formik
        initialValues={{
          start_date: props.billperiod.start_date || '',
          end_date: props.billperiod.end_date || '',
          period_name: props.billperiod.period_name || '',
        }}
        onSubmit={async (values) => {
          if (props.startdate !== null) {
            values.start_date = new Date(props.startdate);
          }
          console.log(props.startdate);
          console.log(values);
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
                {props.startdate === null ? (
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
                ) : (
                  <FormGroup>
                    <label className="focused">Start Date</label>
                    <TextInput
                      type="text"
                      name="start_date"
                      format="dd-mm-yyyy"
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
                      placeholder={props.startdate}
                      value={props.startdate}
                      required
                      disabled
                    />
                  </FormGroup>
                )}
                <FormGroup>
                  <label className="focused">End Date</label>
                  <TextInput
                    type="date"
                    name="end_date"
                    format="dd-mm-yyyy"
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
                      {props.type === 'update' ? 'Update Period' : 'Add Period'}
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
