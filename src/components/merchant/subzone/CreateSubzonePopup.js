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
import { subzoneAPI } from '../api/MerchantAPI';
import TextArea from '../../shared/TextArea';

function CreateSubzoneonePopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  }, []);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1>
        {props.type === 'update' ? (
          <span>
            Update {props.subzonename} for {props.zonename}
          </span>
        ) : (
          <span>
            Create {props.subzonename} for {props.zonename}
          </span>
        )}
      </h1>
      <Formik
        initialValues={{
          code: props.subzone.code || '',
          name: props.subzone.name || '',
          description: props.subzone.description || '',
          type: props.subzone.type || '',
        }}
        onSubmit={async (values) => {
          values.zone_id = props.zoneId;
          if (props.type === 'update') {
            values.subzone_id = props.subzone._id;
            await subzoneAPI(props, values, 'update');
          } else {
            await subzoneAPI(props, values, 'create');
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
                  <label htmlFor="code">{props.subzonename} ID*</label>
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
                  <label htmlFor="name">{props.subzonename} Name</label>
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
                  <label htmlFor="type">{props.subzonename} Type</label>
                  <Field
                    type="text"
                    name="type"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextInput}
                  />
                  <ErrorMessage name="type" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="description">Description</label>
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
                      {props.type === 'update' ? (
                        <span>Update {props.subzonename}</span>
                      ) : (
                        <span>Create {props.subzonename}</span>
                      )}
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

export default CreateSubzoneonePopup;
