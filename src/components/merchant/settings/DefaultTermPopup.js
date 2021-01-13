import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormField from '../../shared/FormField';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import SelectInput from '../../shared/SelectInput';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import { setDefaultBillTerm } from '../api/MerchantAPI';

function DefaultBillTermPopup(props) {
  const [billTermName, setBillTermName] = React.useState();

  const handleChange = (e) => {
    console.log(e.target.value);
    setBillTermName(e.target.value);
  };

  const handleSubmit = async () => {
    const obj = {
      days: props.termlist[parseInt(billTermName, 10)].days,
      name: props.termlist[parseInt(billTermName, 10)].name,
    };
    console.log(obj);
    await setDefaultBillTerm(props, obj);
  };

  const termSelectInput = () => {
    return props.termlist.map((val, index) => {
      return (
        <option key={val.name} value={index}>
          {val.name}
        </option>
      );
    });
  };

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1> Default Term</h1>
      <FormGroup onChange={handleChange}>
        <SelectInput
          noPadding
          name="name"
          style={{
            marginBottom: '0px',
          }}
          required
        >
          <option value="">Select term</option>
          {termSelectInput()}
        </SelectInput>
      </FormGroup>
      <Button
        type="submit"
        filledBtn
        onClick={handleSubmit}
        marginTop="10px"
        style={{
          padding: '5px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
        }}
      >
        <span>Set Default Term</span>
      </Button>
    </Popup>
  );
}

export default DefaultBillTermPopup;
