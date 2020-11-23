import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import Popup from '../../../shared/Popup';
import FormGroup from '../../../shared/FormGroup';
import Button from '../../../shared/Button';
import Row from '../../../shared/Row';
import Col from '../../../shared/Col';
import SelectInput from '../../../shared/SelectInput';
import TextInput from '../../../shared/TextInput';
import Loader from '../../../shared/Loader';
import {
  inputBlur,
  inputFocus,
  correctFocus,
} from '../../../utils/handleInputFocus';
import { merchantStaffPositionAPI } from '../../api/MerchantAPI';

function MerchantCreateCashierPopup(props) {
  const selectedBranch = JSON.parse(localStorage.getItem('selectedBranch'));
  useEffect(() => {
    console.log(props.cashier);
    console.log(props.cashier);
    correctFocus(props.type);
  });
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.cashier.name || '',
          working_from:
            props.cashier.working_from || selectedBranch.working_from,
          working_to: props.cashier.working_to || selectedBranch.working_to,
          type: props.cashier.type || '',
        }}
        onSubmit={async (values) => {
          if (props.type === 'update') {
            values.position_id = props.cashier._id;
            values.branch_id = props.cashier.branch_id;
            await merchantStaffPositionAPI(props, values, 'update');
          } else {
            values.branch_id = props.branchId;
            await merchantStaffPositionAPI(props, values, 'create');
          }
        }}
      >
        {(formikProps) => {
          const {
            values,
            isSubmitting,
            handleChange,
            handleBlur,
          } = formikProps;

          return (
            <div>
              <h1>
                {props.type === 'update' ? `Update Position` : `Add Position`}
              </h1>
              <Form>
                <FormGroup>
                  <label>Staff Position Name*</label>
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
                  <label className="focused">Type*</label>
                  <SelectInput
                    type="text"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type*</option>
                    <option value="staff">Staff</option>
                    <option value="cashier">Cashier</option>
                  </SelectInput>
                </FormGroup>
                <label>Working Hours</label>
                <hr style={{ visibility: 'hidden' }}></hr>
                <Row>
                  <Col cW="49%" mR="2%">
                    <FormGroup>
                      <label className="focused">From*</label>
                      <TextInput
                        type="time"
                        name="working_from"
                        // onFocus={(e) => {
                        //   handleChange(e);
                        //   inputFocus(e);
                        // }}
                        // onBlur={(e) => {
                        //   handleBlur(e);
                        //   handleChange(e);
                        //   inputBlur(e);
                        // }}
                        min="00:00"
                        max="23:00"
                        value={values.working_from}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="49%">
                    <FormGroup>
                      <label className="focused">To*</label>
                      <TextInput
                        type="time"
                        min="00:00"
                        max="23:00"
                        name="working_to"
                        // onFocus={(e) => {
                        //   handleChange(e);
                        //   inputFocus(e);
                        // }}
                        // onBlur={(e) => {
                        //   handleBlur(e);
                        //   handleChange(e);
                        //   inputBlur(e);
                        // }}
                        value={values.working_to}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {isSubmitting ? (
                  <Button
                    disabled={isSubmitting}
                    filledBtn
                    marginTop="10px"
                    style={{
                      padding: '5px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    <Loader />
                  </Button>
                ) : (
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
                    <span>
                      {' '}
                      {props.type === 'update'
                        ? `Update Position`
                        : `Add Position`}
                    </span>
                  </Button>
                )}
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default MerchantCreateCashierPopup;
