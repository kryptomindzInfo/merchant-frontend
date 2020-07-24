import React from 'react';
import { Form, Formik } from 'formik';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import SelectInput from '../../shared/SelectInput';
import { inputFocus, inputBlur } from '../../utils/handleInputFocus';
import { editBranchCashier, assignStaff } from '../api/BranchAPI';

function AssignUserPopup(props) {
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.cashier.name || '',
          staff_id: props.cashier.staff_id || '',
        }}
        onSubmit={async (values) => {
          values.cashier_id = props.cashier._id;
          await assignStaff(props, values);
        }}
      >
        {(formikProps) => {
          const {
            values,
            handleChange,
            handleBlur,
            isSubmitting,
          } = formikProps;

          return (
            <div>
              <h1>Assign User</h1>
              <Form>
                <FormGroup>
                  <label>Position Name*</label>
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
                    readOnly
                    autoFocus
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <SelectInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.staff_id}
                    name="staff_id"
                    required
                  >
                    <option value="">Select User</option>
                    {props.user.map((b) => {
                      return (
                        <option key={b._id} value={b._id}>
                          {b.name}
                        </option>
                      );
                    })}
                  </SelectInput>
                </FormGroup>

                {isSubmitting ? (
                  <Button
                    marginTop="10px"
                    style={{
                      padding: '5px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 500,
                    }}
                    filledBtn
                    disabled
                  >
                    <Loader />
                  </Button>
                ) : (
                  <Button
                    marginTop="10px"
                    style={{
                      padding: '5px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 500,
                    }}
                    filledBtn
                  >
                    <span>Assign User</span>
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

export default AssignUserPopup;
