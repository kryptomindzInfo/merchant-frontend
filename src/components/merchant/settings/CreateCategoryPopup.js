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
import { addCategory } from '../api/MerchantAPI';
import TextArea from '../../shared/TextArea';

function CreateCategoryPopup(props) {
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1>Add Category</h1>
      <Formik
        initialValues={{
          name: '',
          type: '',
          description: '',
        }}
        onSubmit={async (values) => {
            await addCategory(props, values);
        }}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
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
                  <ErrorMessage name="period_name" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Code*</label>
                  <Field
                    type="text"
                    name="code"
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
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Description*</label>
                  <Field
                    type="text"
                    name="description"
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
                      Add Category
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

export default CreateCategoryPopup;
