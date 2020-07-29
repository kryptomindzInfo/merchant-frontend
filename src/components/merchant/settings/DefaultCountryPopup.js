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
import { setDefaultCountry } from '../api/MerchantAPI';

function DefaultCountryPopup(props) {
  const [countryName, setCountryName] = React.useState();

  const handleChange = (e) => {
    console.log(e.target.value);
    setCountryName(e.target.value);
  };

  const handleSubmit = async () => {
    const obj = {
      ccode: props.countrylist[parseInt(countryName, 10)].ccode,
      name: props.countrylist[parseInt(countryName, 10)].name,
    };
    console.log(obj);
    await setDefaultCountry(props, obj);
  };

  const countrySelectInput = () => {
    return props.countrylist.map((val, index) => {
      return (
        <option key={val.name} value={index}>
          {val.name}
        </option>
      );
    });
  };

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1> Default Country</h1>
      <FormGroup onChange={handleChange}>
        <SelectInput
          noPadding
          name="name"
          style={{
            marginBottom: '0px',
          }}
          required
        >
          <option value="">Select Country</option>
          {countrySelectInput()}
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
        <span>Set Default Country</span>
      </Button>
    </Popup>
  );
}

export default DefaultCountryPopup;
