import React from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import CountrySelectBox from '../../shared/CountrySelectBox';
import { branchAPI } from '../api/MerchantAPI';

function CreateBranchPopup(props) {
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.merchant.name || '',
          bcode: props.merchant.bcode || '',
          username: props.merchant.username || '',
          address1: props.merchant.address1 || '',
          state: props.merchant.shared || '',
          zip: props.merchant.zip || '',
          country: props.merchant.country || 'Senegal',
          ccode: props.merchant.ccode || '+221',
          mobile: props.merchant.mobile || '',
          email: props.merchant.email || '',
          working_from: props.merchant.working_from || '',
          working_to: props.merchant.working_to || '',
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
          bcode: Yup.string()
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
                      <TextField
                        label="From"
                        type="time"
                        value={values.working_from}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        fullWidth
                        min="00:00"
                        variant="outlined"
                        max="23:00"
                        margin="dense"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="49%">
                    <FormGroup>
                      <TextField
                        label="To"
                        type="time"
                        value={values.working_to}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        fullWidth
                        min="00:00"
                        variant="outlined"
                        max="23:00"
                        margin="dense"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
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
