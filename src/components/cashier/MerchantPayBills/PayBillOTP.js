import React, { useEffect, useState } from 'react';
import FormGroup from '../../FormGroup';
import Button from '../../Button';
import Loader from '../../Loader';
import TextInput from '../../TextInput';
import { inputBlur, inputFocus } from '../../handleInputFocus';
import { toast } from 'react-toastify';
import { payInvoice } from './api/PayBillsAPI';

const PayBillOTP = (props) => {
  const [resendOtp, setResend] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState('');

  const startTimer = () => {
    let time = 30;
    const setTime = setInterval(function () {
      if (time <= 0) {
        clearInterval(setTime);
        setResend(true);
      } else {
        time = time - 1;
        setTimer(time);
      }
    }, 1000);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOtp(value);
  };

  const verifyOTP = async () => {
    setVerifyOtpLoading(true);
    if (otp === '111111') {
      toast.success('OTP verified successfully');
      await payInvoice(props.invoice);
      props.close();
    } else {
      toast.error('OTP Mismatch');
    }
    setVerifyOtpLoading(false);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div>
      <h1>Verify OTP</h1>
      <FormGroup>
        <label>OTP*</label>
        <TextInput
          type="text"
          name="otp"
          onFocus={inputFocus}
          onBlur={inputBlur}
          value={otp}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      {verifyOtpLoading ? (
        <Button filledBtn marginTop="50px" disabled>
          <Loader />
        </Button>
      ) : (
        <Button onClick={() => verifyOTP()} filledBtn marginTop="50px">
          <span>Verify</span>
        </Button>
      )}

      <p className="resend">
        Wait for <span className="timer">{timer}</span> to{' '}
        {resendOtp ? (
          <span className="go" onClick={() => {}}>
            Resend
          </span>
        ) : (
          <span  style={{color: '#f5a623'}}>Resend</span>
        )}
      </p>
    </div>
  );
};

export default PayBillOTP;
