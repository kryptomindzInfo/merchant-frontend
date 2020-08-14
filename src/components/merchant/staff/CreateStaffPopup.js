import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import { STATIC_URL } from '../../constants';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import UploadArea from '../../shared/UploadArea';
import SelectInput from '../../shared/SelectInput';
import Icon from '../../shared/Icon';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import { fetchBranchList, staffAPI } from '../api/MerchantAPI';
import { onFileChange, triggerBrowse } from '../../shared/utils/FileUpload';

function CreateStaffPopup(props) {
  const [branchList, setBranchList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const merchantLogged = JSON.parse(localStorage.getItem('merchantLogged'));
  const { token } = merchantLogged;

  useEffect(() => {
    const getBranchList = async () => {
      const data = await fetchBranchList();
      setBranchList(data.list);
    };
    getBranchList();
    correctFocus(props.type, 2);
  }, []);

  const getBranches = () => {
    return branchList.map((b) => {
      return (
        <option value={b._id} key={b._id}>
          {b.name}
        </option>
      );
    });
  };

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.staff.name || '',
          logo: props.staff.logo || '',
          email: props.staff.email || '',
          mobile: props.staff.mobile || '',
          ccode: props.staff.ccode || '+221',
          username: props.staff.username || '',
          password: props.staff.password || '',
          branch_id: props.staff.branch_id || '',
        }}
        onSubmit={async (values) => {
          if (props.type === 'update') {
            setLoading(true);
            values.staff_id = props.staff._id;
            await staffAPI(props, values, 'update');
            setLoading(false);
          } else {
            setLoading(true);
            await staffAPI(props, values, 'create');
            setLoading(false);
          }
        }}
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
              <h1> {props.type === 'update' ? 'UpdatStaff' : 'Add Staff'}</h1>
              <FormGroup mR="10%" mL="10%">
                <label>Name*</label>
                <TextInput
                  type="text"
                  name="name"
                  pattern=".{4,15}"
                  title="Minimum 4 characters"
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
              <FormGroup mR="10%" mL="10%">
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

              <Row mR="10%" mL="10%">
                <Col cW="30%">
                  <FormGroup>
                    <label>Country Code*</label>
                    <TextInput
                      type="text"
                      name="ccode"
                      onFocus={(e) => {
                        handleChange(e);
                        inputFocus(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                        inputBlur(e);
                      }}
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

              <FormGroup mR="10%" mL="10%">
                <label>User Id*</label>
                <TextInput
                  type="text"
                  name="username"
                  pattern=".{4,15}"
                  title="Minimum 4 characters"
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

              <FormGroup mR="10%" mL="10%">
                <label>Temporary Password*</label>
                <TextInput
                  type="password"
                  pattern=".{8,}"
                  title="Minimum 8 Characters"
                  name="password"
                  onFocus={(e) => {
                    handleChange(e);
                    inputFocus(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleChange(e);
                    inputBlur(e);
                  }}
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
                  {branchList && branchList.length > 0 ? getBranches() : null}
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
                  <div
                    className="uploadTrigger"
                    onClick={() => triggerBrowse('logo')}
                  >
                    <input
                      type="file"
                      id="logo"
                      data-key="logo"
                      onChange={(e) => {
                        onFileChange(e, token, 'merchant').then((name) => {
                          setFieldValue('logo', name);
                        });
                      }}
                    />
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
              {isLoading ? (
                <Button filledBtn marginTop="20px" disabled>
                  <Loader />
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  filledBtn
                  marginTop="20px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  <span>
                    {props.type === 'update' ? 'Update Staff' : 'Add Staff'}
                  </span>
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
