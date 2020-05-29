import React from 'react';
import { Formik } from 'formik';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import { inputBlur, inputFocus } from '../../utils/handleInputFocus';

function EditCashierPopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.cashier.name || '',
          logo_hash: props.cashier.logo_hash || '',
          description: props.cashier.description || '',
          document_hash: props.cashier.document_hash || '',
          email: props.cashier.email || '',
          mobile: props.cashier.mobile || '',
          cashier_id: props.cashier.username || '',
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

          return (
            <div>
              <h1>Edit Cashier</h1>
              <FormGroup mR="10%" mL="10%">
                <label>Cashier Name*</label>
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
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup mR="10%" mL="10%">
                <label>Cashier Code*</label>
                <TextInput
                  type="text"
                  autoFocus
                  name="bcode"
                  onFocus={(e) => {
                    handleChange(e);
                    inputFocus(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleChange(e);
                    inputBlur(e);
                  }}
                  value={values.bcode}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <label style={{ marginRight: '10%', marginLeft: '10%' }}>
                Working Hours
              </label>
              <Row mR="10%" mL="10%">
                <Col cW="30%" mR="2%">
                  <FormGroup>
                    <label>From*</label>
                    <TextInput
                      type="text"
                      autoFocus
                      name="working_from"
                      onFocus={(e) => {
                        handleChange(e);
                        inputFocus(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                        inputBlur(e);
                      }}
                      value={values.working_from}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col cW="68%">
                  <FormGroup>
                    <label>To*</label>
                    <TextInput
                      type="text"
                      autoFocus
                      title="10 Digit numeric value"
                      name="working_to"
                      onFocus={(e) => {
                        handleChange(e);
                        inputFocus(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                        inputBlur(e);
                      }}
                      value={values.working_to}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup mR="10%" mL="10%">
                <label>Maximum per transaction amount*</label>
                <TextInput
                  type="text"
                  name="per_trans_amt"
                  autoFocus
                  onFocus={(e) => {
                    handleChange(e);
                    inputFocus(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleChange(e);
                    inputBlur(e);
                  }}
                  value={values.per_trans_amt}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup mR="10%" mL="10%">
                <label>Maximum daily transaction amount*</label>
                <TextInput
                  type="text"
                  name="max_trans_amt"
                  onFocus={(e) => {
                    handleChange(e);
                    inputFocus(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleChange(e);
                    inputBlur(e);
                  }}
                  autoFocus
                  value={values.max_trans_amt}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup mR="10%" mL="10%">
                <label>Maximum daily transaction count*</label>
                <TextInput
                  type="text"
                  name="max_trans_count"
                  onFocus={(e) => {
                    handleChange(e);
                    inputFocus(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleChange(e);
                    inputBlur(e);
                  }}
                  value={values.max_trans_count}
                  autoFocus
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              {values.editBranchLoading ? (
                <Button
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    width: '80%',
                  }}
                  filledBtn
                  marginTop="50px"
                  disabled
                >
                  <Loader />
                </Button>
              ) : (
                <Button
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    width: '80%',
                  }}
                  filledBtn
                  marginTop="50px"
                >
                  <span>Update Cashier</span>
                </Button>
              )}
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default EditCashierPopup;
