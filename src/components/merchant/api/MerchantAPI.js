import axios from 'axios';
import { MERCHANT_API } from '../../constants';
import notify from '../../utils/Notify';

// API's for Merchant Dashboard
const getWalletBalance = async () => {
  try {
    const res = await axios.get(`${MERCHANT_API}/getWalletBalance`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return 0;
      }
      return res.data.balance;
    }
  } catch (e) {
    notify('Could not fetch balance!', 'error');
    return 0;
  }
};

const fetchDashboardHistory = async () => {
  try {
    const token = localStorage.getItem('merchantLogged');
    const res = await axios.post(`${MERCHANT_API}/history`, {
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
    notify('Could not fetch history!', 'error');
    return { list: [], loading: false };
  }
};

// API's for Merchant Branches
const branchAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = '/editBranch';
    values.username = values.merchant_id;
  } else {
    API = '/createBranch';
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
    const res = await axios.get(`${MERCHANT_API}/listBranches`);
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
    API = '/editStaff';
  } else {
    API = '/addStaff';
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
    const res = await axios.post(`${MERCHANT_API}/listStaff`);
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
  fetchDashboardHistory,
};
