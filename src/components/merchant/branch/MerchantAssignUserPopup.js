import React from 'react';
import { Form, Formik } from 'formik';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import SelectInput from '../../shared/SelectInput';
import { inputFocus, inputBlur } from '../../utils/handleInputFocus';

function MerchantAssignUserPopup(props) {
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
          users: [
            {
              _id: '2sdnjs',
              name: 'Yusuf',
            },
          ],
        }}
        onSubmit={{}}
      >
        {(formikProps) => {
          const { values, handleChange, handleBlur } = formikProps;

          return (
            <Form>
              <div>
                <h1>Assign User</h1>
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
                    readOnly
                    autoFocus
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Cashier Code*</label>
                  <TextInput
                    type="text"
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
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <label>Assign User*</label>
                  <SelectInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_user_id}
                    name="bank_user_id"
                    placeholder="Assign User*"
                    required
                  >
                    <option value="">Select User</option>
                    {values.users.map((b) => {
                      return (
                        <option key={b._id} value={b._id}>
                          {b.name}
                        </option>
                      );
                    })}
                  </SelectInput>
                </FormGroup>

                {values.assignLoading ? (
                  <Button
                    style={{
                      padding: '5px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 500,
                      width: '80%',
                      marginLeft: '10%',
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
                      marginLeft: '10%',
                    }}
                    filledBtn
                    marginTop="50px"
                  >
                    <span>Assign User</span>
                  </Button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default MerchantAssignUserPopup;
