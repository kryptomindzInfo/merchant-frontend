import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import CountrySelectBox from '../../shared/CountrySelectBox';
import { branchAPI } from '../api/MerchantAPI';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';

function CreateBranchPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  });
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.branch.name || '',
          code: props.branch.code || '',
          username: props.branch.username || '',
          address1: props.branch.address1 || '',
          state: props.branch.state || '',
          zip: props.branch.zip || '',
          country: props.branch.country || 'Senegal',
          ccode: props.branch.ccode || '+221',
          mobile: props.branch.mobile || '',
          email: props.branch.email || '',
          working_from: props.branch.working_from || '',
          working_to: props.branch.working_to || '',
        }}
        onSubmit={async (values) => {
          if (props.type === 'update') {
            await branchAPI(props, values, 'update');
          } else {
            await branchAPI(props, values, 'create');
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
          code: Yup.string()
            .min(3, 'Branch code should be atleast 3 characters')
            .required('Branch code is required'),
          name: Yup.string()
            .min(3, 'Merchant name should be atleast 3 characters')
            .required('Merchant name is required'),
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

          const countryChange = (event) => {
            const { value } = event.target;
            const { title } = event.target.options[event.target.selectedIndex];
            setFieldValue('ccode', title, true);
            setFieldValue('country', value, true);
          };

          return (
            <div>
              <h1>
                {props.type === 'update' ? 'Update Branch' : 'Add Branch'}
              </h1>
              <Form>
                <FormGroup>
                  <label>Branch Name*</label>
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
                  <label>Branch ID*</label>
                  <TextInput
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
                    value={values.code}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Branch Admin: User ID*</label>
                  <TextInput
                    type="text"
                    name="username"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
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
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
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
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Zip Code</label>
                      <TextInput
                        type="text"
                        name="zip"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
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
                      <CountrySelectBox
                        type="text"
                        name="country"
                        value={values.country}
                        onChange={countryChange}
                        data-change="ccode"
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <label>Authorized Email Id*</label>
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
                        onFocus={inputFocus}
                        onBlur={inputBlur}
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
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={values.working_to}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
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
                      {props.type === 'update' ? 'Update Branch' : 'Add Branch'}
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
