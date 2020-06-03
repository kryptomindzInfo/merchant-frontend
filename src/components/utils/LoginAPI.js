import axios from 'axios';
import { API_URL, MERCHANT_API } from '../constants';
import notify from './Notify';
import history from './history';
import { verifyUrl, merchantDashboardUrl, loginUrl } from '../Url';

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
    default:
      break;
  }
};

const login = (loginCreds) => {
  let API = '';
  if (loginCreds.type === 'merchant') {
    API = `${MERCHANT_API}/login`;
  } else {
    API = `${API_URL}/${loginCreds.type}/${loginCreds.id}/login`;
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
    .post(`${MERCHANT_API}/changePassword`, values)
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
            history.push(loginUrl);
          }, 1000);
        }
      }
    })
    .catch((error) => {
      notify('Something Went Wrong', 'error');
    });
};
export { login, signInVerify };
