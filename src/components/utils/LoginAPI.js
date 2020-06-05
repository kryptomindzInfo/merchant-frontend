import axios from 'axios';
import { API_URL, MERCHANT_API } from '../constants';
import notify from './Notify';
import history from './history';
import { loginUrl, merchantDashboardUrl, verifyUrl } from '../Url';

const redirectUser = (type, response) => {
  switch (type) {
    case 'merchant':
      localStorage.setItem('merchantLogged', JSON.stringify(response.data));
      if (response.data.details.status === 0) {
        history.push(verifyUrl);
      } else {
        history.push(merchantDashboardUrl);
      }
      break;

    case 'branch':
      localStorage.setItem('branchLogged', JSON.stringify(response.data));
      if (response.data.details.status === 0) {
        history.push(
          `/merchant/branch/${response.data.details.name}/login-verify`,
        );
      } else {
        history.push(
          `/merchant/branch/${response.data.details.name}/dashboard`,
        );
      }
      break;
    default:
      break;
  }
};

const loginRedirect = (type, name) => {
  switch (type) {
    case 'merchant':
      history.push(loginUrl);
      break;
    case 'branch':
      history.push(`/merchant/branch/${name}/dashboard`);
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
      API = `${API_URL}/merchantBranch/login`;
      break;
    case 'cashier':
      API = `${API_URL}/merchantCashier/login`;
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
          notify(res.data.error, 'error');
        } else {
          redirectUser(loginCreds.type, res);
        }
      }
    })
    .catch((error) => {
      notify('Something Went Wrong', 'error');
    });
};

const signInVerify = (values) => {
  axios
    .post(`${API_URL}/${values.type}/changePassword`, values.password)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.error, 'error');
        } else {
          const successMessage = res.data.message.concat(
            '. Redirecting you to login page!',
          );
          notify(successMessage, 'success');
          setTimeout(() => {
            loginRedirect(values.type, values.name);
          }, 1000);
        }
      }
    })
    .catch((error) => {
      notify('Something Went Wrong', 'error');
    });
};
export { login, signInVerify };
