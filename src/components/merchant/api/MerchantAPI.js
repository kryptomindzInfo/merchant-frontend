import axios from 'axios';
import { MERCHANT_API, API_URL } from '../../constants';
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

const fetchBranchListByZone = async (zoneId) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listBranchesByZoneId`, {
      zone_id: zoneId,
    });
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

const blockMerchantBranch = async (branchId) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/blockBranch`, {
      branch_id: branchId,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.data, 'success');
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const unblockMerchantBranch = async (branchId) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/unblockBranch`, {
      branch_id: branchId,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.data, 'success');
      }
    } else {
      notify(res.data.data, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
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

const blockStaffAPI = async (apiType, id) => {
  let API = '';
  if (apiType === 'block') {
    API = '/blockStaff';
  } else {
    API = '/unblockStaff';
  }
  try {
    const res = await axios.post(`${MERCHANT_API}${API}`, {
      staff_id: id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.data, 'success');
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
      return { list: res.data.staffs, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

// API's for Merchant Offering

const uploadOffering = async (props, offeringList) => {
  try {
    const res = await axios.post(
      `${MERCHANT_API}/uploadOfferings`,
      offeringList,
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshOfferingList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const fetchOfferingList = async () => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listOfferings`, {});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.offerings, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const deleteOffering = async (offeringId) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/deleteOffering`, {
      offering_id: offeringId,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.data, 'success');
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const editOffering = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/editOffering`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshOfferingList(res.data.data);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong', 'error');
  }
};

// API's for Merchant Taxes
const fetchTaxList = async () => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listTaxes`, {});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.taxes, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const createTax = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/createTax`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshTaxList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const editTax = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/editTax`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshTaxList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const deleteTax = async (taxId) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/deleteTax`, {
      tax_id: taxId,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.data, 'success');
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

// API's for Merchant Settings
const editMerchant = async (props, values) => {
  try {
    values.username = values.merchant_id;
    const res = await axios.post(`${MERCHANT_API}/editDetails`, {
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
    if (ruleType === 'Fee') {
      URL = `${MERCHANT_API}/merchantFee/getRules`;
    } else {
      URL = `${MERCHANT_API}/commission/getRules`;
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
  if (ruleType === 'Fee') {
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
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

// Merchant Cashier APIs

const merchantCashierAPI = async (props, values, apiType) => {
  let URL = '';
  if (apiType === 'update') {
    URL = `${MERCHANT_API}/editCashier`;
  } else {
    URL = `${MERCHANT_API}/addCashier`;
  }
  try {
    const res = await axios.post(URL, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshCashierList(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const getMerchantCashier = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listCashier`, {
      branch_id: id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.cashiers, loading: false };
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
  blockStaffAPI,
  getWalletBalance,
  zoneAPI,
  fetchZoneList,
  fetchStaffList,
  fetchDashboardHistory,
  editMerchant,
  getRules,
  ruleAPI,
  blockMerchantBranch,
  unblockMerchantBranch,
  merchantCashierAPI,
  getMerchantCashier,
  uploadOffering,
  fetchOfferingList,
  deleteOffering,
  editOffering,
  fetchTaxList,
  createTax,
  editTax,
  deleteTax,
  fetchBranchListByZone,
};
