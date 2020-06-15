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

const zoneAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = '/editZone';
  } else {
    API = '/createZone';
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
        props.refreshZoneList(res.data.data);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong', 'error');
  }
};

const fetchZoneList = async () => {
  try {
    const res = await axios.get(`${MERCHANT_API}/listZones`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.zones, loading: false };
    }
  } catch (e) {
    notify('Could not fetch zones!', 'error');
    return { list: [], loading: false };
  }
};

// API's for Merchant Branches
const branchAPI = async (props, values, apiType) => {
  let API = '';
  // temperorily add zone_id
  values.zone_id = 'demo';
  if (apiType === 'update') {
    API = '/editBranch';
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
        props.refreshBranchList(res.data.data);
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
      return { list: res.data.branches, loading: false };
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
    const res = await axios.get(`${MERCHANT_API}/listStaff`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.data, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

// API's for Merchant Settings
const editMerchant = async (props, values, token) => {
  try {
    values.username = values.merchant_id;
    const res = await axios.post(`${MERCHANT_API}/editDetails`, {
      token,
      status: 1,
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshMerchantList(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const getRules = async (ruleType) => {
  try {
    let URL = '';
    if (ruleType === 'Revenue') {
      URL = `${MERCHANT_API}/merchantFee/getRule`;
    } else {
      URL = `${MERCHANT_API}/commission/getRule`;
    }
    const res = await axios.get(URL);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.rules, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const ruleAPI = async (props, ruleType, ruleStatus, payload) => {
  let URL = '';
  if (ruleType === 'Revenue') {
    URL = `${MERCHANT_API}/merchantFee/${ruleStatus}`;
  } else {
    URL = `${MERCHANT_API}/commission/${ruleStatus}`;
  }
  try {
    const res = await axios.post(URL, payload);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshRuleList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

export {
  branchAPI,
  fetchBranchList,
  staffAPI,
  getWalletBalance,
  zoneAPI,
  fetchZoneList,
  fetchStaffList,
  fetchDashboardHistory,
  editMerchant,
  getRules,
  ruleAPI,
};
