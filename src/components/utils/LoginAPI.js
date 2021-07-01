import axios from 'axios';
import { API_URL, MERCHANT_API } from '../constants';
import notify from './Notify';
import history from './history';
import { verifyUrl, merchantDashboardUrl, loginUrl } from '../Url';
import { getNameBasedOnType, getUrlBasedOnType } from './urlUtils';

const redirectUser = (type, response) => {
  console.log(response);
  const name = localStorage.getItem(`${type}_name`);
  switch (type) {
    case 'merchant':
      localStorage.setItem('merchantLogged', JSON.stringify(response.data));
      if (response.data.details.status === 0) {
        history.push(`/merchant/${name}/login-verify`);
      } else {
        history.push(`/merchant/dashboard`);
      }
      break;

    case 'branch':
      localStorage.setItem('branchLogged', JSON.stringify(response.data));
      if (response.data.details.status === 0) {
        history.push(`/branch/${name}/login-verify`);
      } else {
        history.push(`/branch/dashboard`);
      }
      break;
    case 'cashier':
      localStorage.setItem('cashierLogged', JSON.stringify(response.data));
      console.log(response);
      if (response.data.status === 0) {
        history.push(`/cashier/${name}/login-verify`);
      } else {
        if(response.data.position.type === 'staff') {
          history.push(`/staff/dashboard`);
        } else {
          console.log(response);
          history.push(`/cashier/dashboard`);
        }
      }
      break;
    default:
      break;
  }
};

const login = (loginCreds) => {
  let API = '';
  switch (loginCreds.type) {
    case 'merchant':
      API = `${MERCHANT_API}/login`;
      break;
    case 'branch':
      API = `${API_URL}/${getNameBasedOnType(loginCreds.type)}/login`;
      break;
    case 'cashier':
      API = `${API_URL}/${getNameBasedOnType(loginCreds.type)}/login`;
      break;
    default:
      API = `${MERCHANT_API}/login`;
      break;
  }
  axios
    .post(API, loginCreds.values)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.message, 'error');
        } else {
          redirectUser(loginCreds.type, res);
        }
      }
    })
    .catch((_) => {
      notify('Something Went Wrong', 'error');
    });
};

const signInVerify = (values, type) => {
  const name = localStorage.getItem(`${type}_name`);
  axios
    .post(`${API_URL}/${getNameBasedOnType(type)}/changePassword`, values)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.error, 'error');
        } else {
          const successMessage = res.data.message.concat(
            '. Redirecting you to login page!',
          );
          notify(successMessage, 'success');
          const loginURL = getUrlBasedOnType(type, name, 'login');
          setTimeout(() => {
            history.push(loginURL);
          }, 2000);
        }
      }
    })
    .catch((_) => {
      notify('Something Went Wrong', 'error');
    });
};
export { login, signInVerify };
