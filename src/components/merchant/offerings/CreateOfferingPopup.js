import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Popup from '../../shared/Popup';
import TextInput from '../../shared/TextInput';
import OfferingTypeSelectBox from '../../shared/OfferingTypeSelectBox';
import { editOffering } from '../api/MerchantAPI';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';

function CreateOfferingPopup(props) {
  useEffect(() => {
    correctFocus(props.type);
  });
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.offering.name || '',
          code: props.offering.code || '',
          denomination: props.offering.denomination || '',
          unit_of_measure: props.offering.unit_of_measure || '',
          unit_price: props.offering.unit_price || '',
          type: '',
        }}
        onSubmit={async (values) => {
          values.offering_id = props.offering._id;
          if (props.type === 'update') {
            await editOffering(props, values);
          }
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required('Offering code is required'),
          name: Yup.string().required('Name no is required'),
          denomination: Yup.string().required('Denomination is required'),
          unit_of_measure: Yup.string().required('Unit of measure is required'),
          unit_price: Yup.string().required('Unit price is required'),
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

          const typeChange = (event) => {
            const { value } = event.target;
            setFieldValue('type', value, true);
          };

          return (
            <div>
              <h1>
                {props.type === 'update' ? 'Update Offering' : 'Add Offering'}
              </h1>
              <Form>
                <FormGroup>
                  <label>Offering Name*</label>
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
                  <label>Offering Code*</label>
                  <TextInput
                    type="text"
                    name="code"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.code}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Denomination*</label>
                  <TextInput
                    type="text"
                    name="denomination"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.denomination}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Unit of measure*</label>
                  <TextInput
                    type="text"
                    name="unit_of_measure"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.unit_of_measure}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Unit Price*</label>
                  <TextInput
                    type="text"
                    name="unit_price"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    value={values.unit_price}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Select Type</label>
                  <OfferingTypeSelectBox
                    type="text"
                    name="type"
                    value={values.type}
                    onChange={typeChange}
                    required
                  />
                </FormGroup>
                <Button
                  type="submit"
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
                      {props.type === 'update'
                        ? 'Update Offering'
                        : 'Add Offering'}
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

export default CreateOfferingPopup;
