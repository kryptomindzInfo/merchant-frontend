import axios from 'axios';
import * as toast from 'react-toastify';
import { API_URL } from '../../constants';
import notify from '../../utils/Notify';

// API's for Merchant Dashboard
const getWalletBalance = async () => {
  try {
    const res = await axios.get(`${API_URL}/merchant/getWalletBalance`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        return res.data.amount;
      }
    }
  } catch (e) {
    toast.error('Could not fetch balance!');
  }
};

// API's for Merchant Branches
const branchAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = '/merchant/editBranch';
    values.username = values.merchant_id;
  } else {
    API = '/merchant/createBranch';
  }
  try {
    const res = await axios.post(`${API_URL}${API}`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshBranchList();
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
    const res = await axios.post(`${API_URL}/merchant/listBranches`);
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

// API's for Merchant Staff

const staffAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = '/merchant/editStaff';
  } else {
    API = '/merchant/addStaff';
  }
  try {
    const res = await axios.post(`${API_URL}${API}`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshStaffList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const fetchStaffList = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchant/listStaff`);
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

export {
  branchAPI,
  fetchBranchList,
  staffAPI,
  getWalletBalance,
  fetchStaffList,
};
