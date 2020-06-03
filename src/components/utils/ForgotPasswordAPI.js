import axios from 'axios';
import { API_URL } from '../constants';
import notify from './Notify';
import history from './history';

const getUrlBasedOnType = (type, branchName, url) => {
  switch (type) {
    case 'merchant':
      return `/merchant/${url}`;
    case 'branch':
      return `/branch/${branchName}/${url}`;
    case 'cashier':
      return `/cashier/${branchName}/${url}`;
    default:
      return `/`;
  }
};
const forgotPassword = (type, branchName, reqBody) => {
  axios
    .post(`${API_URL}/common/forgotPassword`, reqBody)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.message, 'error');
        } else if (res.data.status === 1) {
          const successMessage = 'Redirecting you to OTP page!';
          notify(successMessage, 'success');
          localStorage.setItem(`otpNo_${type}`, reqBody.mobile);
          const otpUrl = getUrlBasedOnType(
            type,
            branchName,
            'otp-forgot-password',
          );
          setTimeout(() => {
            history.push(otpUrl);
          }, 2000);
        }
      }
    })
    .catch((error) => {
      notify('Something Went Wrong', 'error');
    });
};

const verifyOTP = (type, branchName, reqBody) => {
  const mobile = localStorage.getItem(`otpNo_${type}`);
  reqBody.mobile = mobile;
  axios
    .post(`${API_URL}/common/verifyForgotPasswordOTP`, reqBody)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.message, 'error');
          localStorage.removeItem(`otpNo_${type}`);
        } else if (res.data.status === 1) {
          notify(res.data.message, 'success');
          localStorage.removeItem(`otpNo_${type}`);
          notify('Redirecting you to Login page!', 'success');
          const loginUrl = getUrlBasedOnType(type, branchName, 'login');
          setTimeout(() => {
            history.push(loginUrl);
          }, 4000);
        }
      }
    })
    .catch((error) => {
      notify('Something Went Wrong', 'error');
    });
};
export { forgotPassword, verifyOTP };
