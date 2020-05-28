import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import { API_URL, STATIC_URL } from '../../constants';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import UploadArea from '../../shared/UploadArea';
import SelectInput from '../../shared/SelectInput';
import Icon from '../../shared/Icon';

function CreateStaffPopup(props) {
  const token = localStorage.getItem('staffLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.staff.name || '',
          logo_hash: props.staff.logo_hash || '',
          description: props.staff.description || '',
          document_hash: props.staff.document_hash || '',
          email: props.staff.email || '',
          mobile: props.staff.mobile || '',
          staff_id: props.staff.username || '',
        }}
        onSubmit={{}}
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
                toast.error('something went wrong!');
              });
          };

          const onChange = (e) => {
            if (e.target.files && e.target.files[0] != null) {
              fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
            }
          };

          return (
            <div>
              <h1>Create Staff</h1>
              <FormGroup mR="10%" mL="10%">
                <label>Name*</label>
                <TextInput
                  type="text"
                  name="name"
                  pattern=".{4,15}"
                  title="Minimum 4 characters"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup mR="10%" mL="10%">
                <label>Email*</label>
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

              <Row mR="10%" mL="10%">
                <Col cW="30%">
                  <FormGroup>
                    <label>Country Code*</label>
                    <TextInput
                      type="text"
                      name="ccode"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      value={values.ccode}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col cW="68%">
                  <FormGroup>
                    <label>Mobile*</label>
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

              <FormGroup mR="10%" mL="10%">
                <label>User Id*</label>
                <TextInput
                  type="text"
                  name="username"
                  pattern=".{4,15}"
                  title="Minimum 4 characters"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={values.username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup mR="10%" mL="10%">
                <label>Temporary Password*</label>
                <TextInput
                  type="password"
                  pattern=".{8,}"
                  title="Minimum 8 Characters"
                  name="password"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup mR="10%" mL="10%">
                <SelectInput
                  type="text"
                  name="branch_id"
                  value={values.branch_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Branch*</option>
                  {/*  {values.branches && values.branches.length > 0
                    ? values.branches.map(function (b) {
                      return (
                        <option value={b._id} key={b._id}>
                          {b.name}
                        </option>
                      );
                    })
                    : null} */}
                </SelectInput>
              </FormGroup>

              <FormGroup mR="10%" mL="10%">
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
                  <div className="uploadTrigger">
                    <input type="file" id="logo" data-key="logo" />
                    {!values.logo ? (
                      <i className="material-icons">cloud_upload</i>
                    ) : (
                      ' '
                    )}
                    <label>
                      {values.logo === '' ? (
                        <span>Profile Photo</span>
                      ) : (
                        <span>Change Profile Photo</span>
                      )}
                      *
                    </label>
                  </div>
                </UploadArea>
              </FormGroup>
              <Icon className="material-icons">
                <FingerprintIcon style={{ fontSize: '45px' }} />
              </Icon>
              {values.addUserLoading ? (
                <Button filledBtn marginTop="20px" disabled>
                  <Loader />
                </Button>
              ) : (
                <Button
                  filledBtn
                  marginTop="20px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  <span>Add User</span>
                </Button>
              )}
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default CreateStaffPopup;
