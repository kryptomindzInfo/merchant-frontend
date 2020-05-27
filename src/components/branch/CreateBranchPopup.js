import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import notify from '../utils/Notify';
import { createBranch, editBranch } from './api/branchAPI';
import Popup from '../shared/Popup';
import FormGroup from '../shared/FormGroup';
import { API_URL } from '../constants';
import Button from '../shared/Button';
import Row from '../shared/Row';
import Col from '../shared/Col';
import TextInput from '../shared/TextInput';
import CountrySelectBox from '../shared/CountrySelectBox';

function CreateBranchPopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.merchant.name || '',
          logo_hash: props.merchant.logo_hash || '',
          description: props.merchant.description || '',
          document_hash: props.merchant.document_hash || '',
          email: props.merchant.email || '',
          mobile: props.merchant.mobile || '',
          merchant_id: props.merchant.username || '',
        }}
        onSubmit={async (values) => {
          if (props.type === 'update') {
            await editBranch(props, values, token);
          } else {
            await createBranch(props, values, token);
          }
        }}
        validationSchema={Yup.object().shape({
          mobile: Yup.string()
            .min(10, 'number should be atleast 10 digits')
            .max(10, 'number cannot exceed 10 digits')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Mobile no must be valid',
            )
            .required('Mobile no is required'),
          merchant_id: Yup.string()
            .min(3, 'Merchant Id should be atleast 3 characters')
            .required('Merchant Id is required'),
          name: Yup.string()
            .min(3, 'Merchant name should be atleast 3 characters')
            .required('Merchant name is required'),
          logo_hash: Yup.string().required('Merchant logo is required'),
          document_hash: Yup.string().required('Merchant contract is required'),
          email: Yup.string()
            .email('Please provide a valid email')
            .required('Email is required'),
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

          const triggerBrowse = (inp) => {
            const input = document.getElementById(inp);
            input.click();
          };

          const fileUpload = (file, key) => {
            const formData = new FormData();
            formData.append('file', file);
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };
            let method = 'fileUpload';
            let url = `${API_URL}/${method}?token=${token}&from=bank`;
            if (key === 'document_hash') {
              method = 'ipfsUpload';
              url = `${API_URL}/${method}?token=${token}`;
            }
            axios
              .post(url, formData, config)
              .then((res) => {
                if (res.status === 200) {
                  if (res.data.error) {
                    throw res.data.error;
                  } else if (key === 'logo_hash') {
                    setFieldValue(key, res.data.name);
                  } else {
                    setFieldValue(key, res.data.hash);
                  }
                } else {
                  throw res.data.error;
                }
              })
              .catch((err) => {
                notify('something went wrong!', 'error');
              });
          };

          const onChange = (e) => {
            if (e.target.files && e.target.files[0] != null) {
              fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
            }
          };

          return (
            <div>
              <h1>
                {props.type === 'update' ? 'Update Merchant' : 'Add Merchant'}
              </h1>
              <Form>
                <FormGroup>
                  <label>Branch Name*</label>
                  <TextInput
                    type="text"
                    name="name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Branch ID*</label>
                  <TextInput
                    type="text"
                    name="bcode"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={values.bcode}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Branch Admin: User ID*</label>
                  <TextInput
                    type="text"
                    name="username"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={values.username}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Address*</label>
                  <TextInput
                    type="text"
                    name="address1"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={values.address1}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <Row>
                  <Col>
                    <FormGroup>
                      <label>State</label>
                      <TextInput
                        type="text"
                        name="state"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={values.state}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Zip Code</label>
                      <TextInput
                        type="text"
                        name="zip"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={values.zip}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <CountrySelectBox />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <label>Authorized Email Id*</label>
                      <TextInput
                        type="email"
                        name="email"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col cW="20%" mR="2%">
                    <FormGroup>
                      <TextInput
                        type="text"
                        name="ccode"
                        readOnly
                        value={values.ccode}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="78%">
                    <FormGroup>
                      <label>Authorized Mobile Number*</label>
                      <TextInput
                        type="text"
                        pattern="[0-9]{10}"
                        title="10 Digit numeric value"
                        name="mobile"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={values.mobile}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <label>Working Hours</label>
                <Row>
                  <Col cW="49%" mR="2%">
                    <FormGroup>
                      <label>From*</label>
                      <TextInput
                        type="time"
                        name="working_from"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        min="00:00"
                        max="23:00"
                        autoFocus
                        value={values.working_from}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="49%">
                    <FormGroup>
                      <label>To*</label>
                      <TextInput
                        type="time"
                        autoFocus
                        min="00:00"
                        max="23:00"
                        name="working_to"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={values.working_to}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  filledBtn
                  marginTop="10px"
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                    <span>
                      {' '}
                      {props.type === 'update'
                        ? 'Update Merchant'
                        : 'Add Merchant'}
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
