import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
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
import { zoneAPI } from '../api/MerchantAPI';
import TextArea from '../../shared/TextArea';

function CreateZonePopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  }, []);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1> {props.type === 'update' ? 'Update Zone' : 'Create Zone'}</h1>
      <Formik
        initialValues={{
          code: props.zone.code || '',
          name: props.zone.name || '',
          description: props.zone.description || '',
        }}
        onSubmit={async (values) => {
          if (props.type === 'update') {
            values.zone_id = props.zone._id;
            await zoneAPI(props, values, 'update');
          } else {
            await zoneAPI(props, values, 'create');
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(3, 'Zone name should be atleast 3 characters')
            .required('Zone name is required'),
          code: Yup.string()
            .min(3, 'Zone Id should be atleast 3 characters')
            .required('Zone Id is required'),
        })}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormField textAlign="start" mB="14px" background="#fff">
                  <label htmlFor="code">Zone ID*</label>
                  <Field
                    type="text"
                    name="code"
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
                  />
                  <ErrorMessage name="code" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Zone Name</label>
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
                  />
                  <ErrorMessage name="name" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Description</label>
                  <Field
                    type="text"
                    name="description"
                    rows="3"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextArea}
                  />
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
                      {props.type === 'update' ? 'Update Zone' : 'Create Zone'}
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

export default CreateZonePopup;
