import React from 'react';
import { Formik } from 'formik';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import SelectInput from '../../shared/SelectInput';

function AssignUserPopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.user.name || '',
          logo_hash: props.user.logo_hash || '',
          description: props.user.description || '',
          document_hash: props.user.document_hash || '',
          email: props.user.email || '',
          mobile: props.user.mobile || '',
          user_id: props.user.username || '',
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
              <h1>Assign User</h1>
              <FormGroup>
                <label>Cashier Name*</label>
                <TextInput
                  type="text"
                  name="name"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={values.name}
                  readOnly
                  autoFocus
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Cashier Code*</label>
                <TextInput
                  type="text"
                  name="bcode"
                  autoFocus
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={values.bcode}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Assign User*</label>
                <SelectInput
                  onFocus={handleFocus}
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bank_user_id}
                  name="bank_user_id"
                  placeholder="Assign User*"
                  required
                >
                  <option value="">Select User</option>
                  {values.users.map(function (b) {
                    return (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    );
                  })}
                </SelectInput>
              </FormGroup>

              {values.assignLoading ? (
                <Button filledBtn marginTop="50px" disabled>
                  <Loader />
                </Button>
              ) : (
                <Button filledBtn marginTop="50px">
                  <span>Assign User</span>
                </Button>
              )}
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default AssignUserPopup;
