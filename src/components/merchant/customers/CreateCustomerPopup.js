import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import { uploadCustomer } from '../api/MerchantAPI';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';

function CreateCustomerPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  });
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.customer.name || '',
          lastName: props.customer.lastName || '',
          customer_code: props.customer.customer_code || '',
          mobile: props.customer.mobile || '',
          email: props.customer.email || '',
          address: props.customer.address || '',
          city: props.customer.city || '',
          state: props.customer.state || '',
          id_type: props.customer.id_type || '',
          id_name: props.customer.id_name || '',
          valid_till: props.customer.valid_till || '',
          id_number: props.customer.id_number || '',
          dob: props.customer.dob || '',
          gender: props.customer.gender || '',
          document_hash: props.customer.document_hash || [],
        }}
        onSubmit={async (values) => {
          if (props.type === 'update') {
            values.customer_id = props.customer._id;
            await editTax(props, values);
          } else {
            await uploadCustomer(props, values);
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required'),
          lastName: Yup.string().required('LastName is required'),
					customer_code: Yup.string().required('Customer code is required'),
					mobile: Yup.string().required('Mobile no is required'),
					email: Yup.string().required('Email is required'),
					address: Yup.string().required('Address is required'),
					city: Yup.string().required('City is required'),
					state: Yup.string().required('State is required'),
					id_type: Yup.string().required('Id type is required'),
					id_name: Yup.string().required('Id name is required'),
					valid_till: Yup.string().required('Valid till is required'),
					id_number: Yup.string().required('Id number is required'),
					dob: Yup.string().required('Dob is required'),
					gender: Yup.string().required('Gender is required'),
					document_hash: Yup.string().required('Document is required'),	
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
              <h1>{props.type === 'update' ? 'Edit Customer' : 'Create Customer'}</h1>
              <Form>
                <FormGroup>
                  <label>Name*</label>
                  <TextInput
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
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Last Name*</label>
                  <TextInput
                    type="text"
                    name="lastName"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Customer code*</label>
                  <TextInput
                    type="text"
                    name="customer_code"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.customer_code}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Mobile*</label>
                  <TextInput
                    type="text"
										name="mobile"
										pattern="[0-9]{10}"
                    title="10 Digit numeric value"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.mobile}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Email*</label>
                  <TextInput
                    type="email"
                    name="email"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Address*</label>
                  <TextInput
                    type="text"
                    name="address"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.address}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>City*</label>
                  <TextInput
                    type="text"
                    name="city"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>State*</label>
                  <TextInput
                    type="text"
                    name="state"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.state}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Id Type*</label>
                  <TextInput
                    type="text"
                    name="id_type"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.id_type}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Id Name*</label>
                  <TextInput
                    type="text"
                    name="id_name"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.id_name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Valid till*</label>
                  <TextInput
                    type="text"
                    name="valid_till"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.valid_till}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Id Number*</label>
                  <TextInput
                    type="text"
                    name="id_number"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.id_number}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
								<FormGroup>
                  <label>Id Number*</label>
                  <TextInput
                    type="text"
                    name="id_number"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.id_number}
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
                    <span>
                      {' '}
                      {props.type === 'update' ? 'Edit TAx' : 'Create Tax'}
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

export default CreateCustomerPopup;