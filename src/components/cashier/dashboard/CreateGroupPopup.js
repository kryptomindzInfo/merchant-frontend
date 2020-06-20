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
import { merchantCashierAPI } from '../../merchant/api/MerchantAPI';
import { groupAPI } from '../api/CashierAPI';

function CreateBranchPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  });

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1>{props.type === 'update' ? `Update Group` : `Create Group`}</h1>
      <Formik
        initialValues={{
          name: props.group.name || '',
          description: props.group.description || '',
          code: props.group.code || '',
        }}
        onSubmit={async (values) => {
          if (props.type === 'update') {
            values.group_id = props.group._id;
            await merchantCashierAPI(props, values, 'update');
          } else {
            await groupAPI(props, values, 'create');
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(3, 'Group name should be atleast 3 characters')
            .required('Group name name is required'),
        })}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="description">Group Code</label>
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
                  />
                </FormField>
                <FormField textAlign="start" mB="14px" background="#fff">
                  <label htmlFor="name">Group Name*</label>
                  <Field
                    type="text"
                    name="name"
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
                  <ErrorMessage name="name" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="description">Description</label>
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
                      {props.type === 'update'
                        ? `Update Group`
                        : `Create Group`}
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

export default CreateBranchPopup;
