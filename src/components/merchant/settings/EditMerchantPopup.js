import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import UploadArea from '../../shared/UploadArea';
import { CONTRACT_URL, STATIC_URL } from '../../constants';
import { onFileChange, triggerBrowse } from '../../shared/utils/FileUpload';
import Button from '../../shared/Button';
import { editMerchant } from '../api/MerchantAPI';
import TextInput from '../../shared/TextInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';

function EditMerchantPopup(props) {
  const { token } = JSON.parse(localStorage.getItem('merchantLogged'));
  useEffect(() => {
    correctFocus('update');
  });
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.merchant.name || '',
          logo: props.merchant.logo || '',
          description: props.merchant.description || '',
          document_hash: props.merchant.document_hash || '',
          email: props.merchant.email || '',
          mobile: props.merchant.mobile || '',
          merchant_id: props.merchant.username || '',
        }}
        onSubmit={async (values) => {
          await editMerchant(props, values);
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
          logo: Yup.string().required('Merchant logo is required'),
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
            setFieldValue,
          } = formikProps;

          return (
            <div>
              <h1>Update Merchant</h1>
              <Form>
                <FormGroup>
                  <label>Merchant ID</label>
                  <TextInput
                    size="small"
                    name="merchant_id"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.merchant_id}
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
                  />
                  <Typography variant="body2" color="error">
                    {errors.merchant_id && touched.merchant_id
                      ? errors.merchant_id
                      : ''}
                  </Typography>
                </FormGroup>
                <FormGroup>
                  <label>Merchant Name</label>
                  <TextInput
                    size="small"
                    name="name"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                  />
                  <Typography variant="body2" color="error">
                    {errors.name && touched.name ? errors.name : ''}
                  </Typography>
                </FormGroup>
                <FormGroup>
                  <label>Description</label>
                  <TextField
                    size="small"
                    name="description"
                    fullWidth
                    style={{ marginBottom: '14px' }}
                    variant="outlined"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Contact Person Email</label>
                  <TextField
                    size="small"
                    name="email"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                  />
                  <Typography variant="body2" color="error">
                    {errors.email && touched.email ? errors.email : ''}
                  </Typography>
                </FormGroup>
                <FormGroup>
                  <label>Contact Person Phone Number</label>
                  <TextField
                    size="small"
                    name="mobile"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.mobile}
                    onChange={handleChange}
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                  />
                  <Typography variant="body2" color="error">
                    {errors.mobile && touched.mobile ? errors.mobile : ''}
                  </Typography>
                </FormGroup>
                <FormGroup>
                  <UploadArea bgImg={STATIC_URL + values.logo}>
                    {values.logo ? (
                      <a
                        className="uploadedImg"
                        href={STATIC_URL + values.logo}
                        target="_BLANK"
                      />
                    ) : (
                      ' '
                    )}
                    <div
                      className="uploadTrigger"
                      onClick={() => triggerBrowse('logo')}
                    >
                      <input
                        type="file"
                        id="logo"
                        onChange={(e) => onFileChange(e, token, 'merchant')}
                        data-key="logo"
                        accept="image/jpeg, image/png, image/jpg"
                      />
                      {!values.logo ? (
                        <i className="material-icons">cloud_upload</i>
                      ) : (
                        ' '
                      )}
                      <label>
                        {values.logo === '' ? (
                          <span>Upload Logo</span>
                        ) : (
                          <span>Change Logo</span>
                        )}
                        *
                      </label>
                    </div>
                  </UploadArea>
                  <Typography variant="body2" color="error">
                    {errors.logo && touched.logo ? errors.logo : ''}
                  </Typography>
                </FormGroup>
                <FormGroup>
                  <UploadArea bgImg={`${STATIC_URL}main/pdf-icon.png`}>
                    {values.document_hash ? (
                      <a
                        className="uploadedImg"
                        href={CONTRACT_URL + values.document_hash}
                        target="_BLANK"
                      />
                    ) : (
                      ' '
                    )}
                    <div
                      className="uploadTrigger"
                      onClick={() => triggerBrowse('document_hash')}
                    >
                      <input
                        type="file"
                        id="logo"
                        data-key="logo"
                        onChange={(e) => onFileChange(e, token, 'merchant')}
                      />
                      {!values.document_hash ? (
                        <i className="material-icons">cloud_upload</i>
                      ) : (
                        ' '
                      )}
                      <label>
                        {values.document_hash === '' ? (
                          <span>Uploaded Contract</span>
                        ) : (
                          <span>Change Contract</span>
                        )}
                        *
                      </label>
                    </div>
                  </UploadArea>
                </FormGroup>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  filledBtn
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                  marginTop="10px"
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                    <span>Update Merchant</span>
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

export default EditMerchantPopup;
