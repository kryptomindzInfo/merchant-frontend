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
import ErrorText from '../../shared/ErrorText';
import { setDefaultBillPeriod } from '../api/MerchantAPI';
import TextArea from '../../shared/TextArea';

function DefaultBillPeriodPopup(props) {
  const [billPeriodName, setBillPeriodName] = React.useState();
  const [hidetoggle, sethidetoggle] = React.useState(false)

  const handleChange = (e) => {
    console.log(e.target.value);
    sethidetoggle(true)
    setBillPeriodName(e.target.value);
  };

  const handleSubmit = async () => {
    const obj = {
      start_date: props.periodlist[parseInt(billPeriodName, 10)].start_date,
      end_date: props.periodlist[parseInt(billPeriodName, 10)].end_date,
      period_name: props.periodlist[parseInt(billPeriodName, 10)].period_name,
    };
    console.log(obj);
    await setDefaultBillPeriod(props, obj);
  };

  useEffect(() => {

    let indexvalue = props.periodlist.findIndex((value) => {
      return value.period_name == props.billperiod.period_name
    })
    console.log(indexvalue)
    // setBillTermName(indexvalue);
    setBillPeriodName(props.periodlist[indexvalue].period_name)
  }, []);

  const periodSelectInput = () => {
    // console.log(billPeriodName)
    return props.periodlist.map((val, index) => {
      return (
        <>
          {billPeriodName != val.period_name &&
            < option key={val.period_name} value={index}>
              {val.period_name}
            </option>
          }
        </>
      );
    });
  };

  console.log(props.billperiod)

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1> Default Period</h1>
      <FormGroup onChange={handleChange}>
        <SelectInput
          noPadding
          name="period_name"
          style={{
            marginBottom: '0px',
          }}
          required
        >
          {/* <option value="">Select period</option> */}
          {hidetoggle ? "Select Term" : (
            <option value="">{props.billperiod.period_name}</option>
          )}
          {periodSelectInput()}
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
        <span>Set Default Period</span>
      </Button>
    </Popup>
  );
}

export default DefaultBillPeriodPopup;
