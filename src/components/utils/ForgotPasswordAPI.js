import axios from 'axios';
import { API_URL } from '../constants';
import notify from './Notify';
import history from './history';
import { getNameBasedOnType, getUrlBasedOnType } from './urlUtils';

const forgotPassword = (type, reqBody) => {
  const name = localStorage.getItem(`${type}_name`);
  axios
    .post(`${API_URL}/${getNameBasedOnType(type)}/forgotPassword`, reqBody)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.message, 'error');
        } else if (res.data.status === 1) {
          const successMessage = 'Redirecting you to OTP page!';
          notify(successMessage, 'success');
          localStorage.setItem(`otpNo_${type}`, res.data.mobile);
          const otpUrl = getUrlBasedOnType(type, name, 'otp-forgot-password');
          setTimeout(() => {
            history.push(otpUrl);
          }, 2000);
        }
      }
    })
    .catch((_) => {
      notify('Something Went Wrong', 'error');
    });
};

const verifyOTP = (type, reqBody) => {
  const mobile = localStorage.getItem(`otpNo_${type}`);
  reqBody.mobile = mobile;
  const name = localStorage.getItem(`${type}_name`);
  axios
    .post(
      `${API_URL}/${getNameBasedOnType(type)}/verifyForgotPasswordOTP`,
      reqBody,
    )
    .then((res) => {
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.message, 'error');
        } else if (res.data.status === 1) {
          notify(res.data.message, 'success');
          localStorage.removeItem(`otpNo_${type}`);
          notify('Generated password sent via SMS!', 'success');
          notify('Redirecting you to Login page!', 'success');
          const loginUrl = getUrlBasedOnType(type, name, 'login');
          setTimeout(() => {
            history.push(loginUrl);
          }, 4000);
        }
      }
    })
    .catch((_) => {
      notify('Something Went Wrong', 'error');
    });
};
export { forgotPassword, verifyOTP };
