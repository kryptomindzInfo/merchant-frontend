import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';

const createBranch = async (props, values, token) => {
  try {
    const res = await axios.post(`${API_URL}/bank/createMerchant`, {
      token,
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshMerchantList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const editBranch = async (props, values, token) => {
  try {
    values.username = values.merchant_id;
    const res = await axios.post(`${API_URL}/bank/editMerchant`, {
      token,
      status: 1,
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshMerchantList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong', 'error');
  }
};

const fetchBranchList = async () => {
  try {
    const token = localStorage.getItem('bankLogged');
    const res = await axios.post(`${API_URL}/bank/listMerchant`, {
      token,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.list, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

export { createBranch, editBranch, fetchBranchList };
