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
  const [hidetoggle, sethidetoggle] = React.useState(false)

  const handleChange = (e) => {
    sethidetoggle(true)
    console.log(e.target.value);
    setBillTermName(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("clck")
    const obj = {
      days: props.termlist[parseInt(billTermName, 10)].days,
      name: props.termlist[parseInt(billTermName, 10)].name,
    };
    console.log(obj);
    console.log(props)
    await setDefaultBillTerm(props, obj);
  };

  useEffect(() => {
    console.log(props.termlist)
    let indexvalue = props.termlist.findIndex((value) => {
      return value.name == props.billterm.name
    })
    console.log(indexvalue)
    // setBillTermName(indexvalue);
    setBillTermName(props.termlist[indexvalue].name)
  }, []);

  const termSelectInput = () => {
    console.log("line no 34")


    return props.termlist.map((val, index) => {
      console.log(billTermName)
      console.log(val.name)
      return (
        <> {billTermName != val.name &&
          <option key={val.name} value={index}>

            {val.name}


          </option>
        }
        </>
      );
    });
  };

  // console.log(props.billterm)
  // if (props.billterm.name != undefined) {
  //   setBillTermName(props.billterm.name)
  // }
  console.log(billTermName)

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
          {hidetoggle ? "Select Term" : (
            <option value="">{props.billterm.name}</option>
          )}
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
