import axios from 'axios';
import { MERCHANT_API } from '../../constants';
import notify from '../../utils/Notify';

const cashierAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = `${MERCHANT_API}/editCashier`;
  } else {
    API = `${MERCHANT_API}/addCashier`;
  }
  try {
    const res = await axios.post(`${MERCHANT_API}${API}`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshCashierList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

// eslint-disable-next-line import/prefer-default-export
export { cashierAPI };
