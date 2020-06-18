import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import {
  inputBlur,
  inputFocus,
  correctFocus,
} from '../../utils/handleInputFocus';
import { merchantCashierAPI } from '../api/MerchantAPI';

function MerchantCreateCashierPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  });
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.cashier.name || '',
          working_from: props.cashier.working_from || '',
          working_to: props.cashier.working_to || '',
          per_trans_amt: props.cashier.per_trans_amt || '',
          max_trans_amt: props.cashier.max_trans_amt || '',
          max_trans_count: props.cashier.max_trans_count || '',
        }}
        onSubmit={async (values) => {
          values.branch_id = props.branchId;
          if (props.type === 'update') {
            values.cashier_id = props.cashier._id;
            await merchantCashierAPI(props, values, 'update');
          } else {
            await merchantCashierAPI(props, values, 'create');
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
                {props.type === 'update' ? `Update Cashier` : `Add Cashier`}
              </h1>
              <Form>
                <FormGroup>
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
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <label>Working Hours</label>
                <Row>
                  <Col cW="49%" mR="2%">
                    <FormGroup>
                      <label>From*</label>
                      <TextInput
                        type="time"
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
                      <label>To*</label>
                      <TextInput
                        type="time"
                        min="00:00"
                        max="23:00"
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
                <FormGroup>
                  <label>Maximum per transaction amount*</label>
                  <TextInput
                    type="text"
                    name="per_trans_amt"
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
                <FormGroup>
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
                    value={values.max_trans_amt}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
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
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                {values.editBranchLoading ? (
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
                        ? `Update Cashier`
                        : `Add Cashier`}
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
