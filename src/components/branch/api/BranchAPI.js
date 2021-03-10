import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';

const getMerchantSettings = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchantBranch/getSettings`, {});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return {
          bill_period_list: [],
          bill_term_list: [],
          default_bill_term: {},
          default_bill_period: {},
          country_list: [],
          default_country: {},
          bill_period: [],
          loading: false,
        };
      }
      return {
        bill_period_list: res.data.setting.bill_period,
        bill_term_list: res.data.setting.bill_term,
        default_bill_term: res.data.setting.default_bill_term,
        default_bill_period: res.data.setting.default_bill_period,
        country_list: res.data.setting.country_list,
        default_country: res.data.setting.default_country,
        bill_period: res.data.setting.bill_period,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
    return {
      bill_period_list: [],
      bill_term_list: [],
      default_bill_term: {},
      default_bill_period: {},
      country_list: [],
      default_country: {},
      bill_period:[],
      loading: false,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return {
      bill_period_list: [],
      bill_term_list: [],
      default_bill_term: {},
      default_bill_period: {},
      country_list: [],
      default_country: {},
      bill_period:[],
      loading: false,
    };
  }
};


const fetchInvoicesBydate = async (date) => {
  try {
    const res = await axios.post(`${API_URL}/merchantBranch/listInvoicesByDate`, {
      date: date,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.invoices, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};
const fetchInvoicesByPeriod = async (start,end) => {
  try {
    const res = await axios.post(`${API_URL}/merchantBranch/listInvoicesByPeriod`, {
      start_date: start,
      end_date:end,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.invoices, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const fetchInvoicesByDateRange = async (start,end) => {
  try {
    const res = await axios.post(`${API_URL}/merchantBranch/listInvoicesByDateRange`, {
      start_date: start,
      end_date:end,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.invoices, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const branchFetchInvoicesBydate = async (date, id) => {
  try {
    const res = await axios.post(`${API_URL}/merchantBranch/listInvoicesByDate`, {
      date: date,
      staff_id: id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.invoices, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};


const fetchDailyStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/merchantBranch/todaysStatus`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { stats: {}, loading: false };
      }
      return { stats: res.data, loading: false };
    }
    notify(res.data.message, 'error');
    return { stats: {}, loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { stats: {}, loading: false };
  }
};

const editBranchCashier = async (props, values) => {
  const API = `${API_URL}/merchantBranch/editPosition`;
  try {
    const res = await axios.post(`${API}`, {
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

const getBranchCashier = async () => {
  try {
    const res = await axios.get(`${API_URL}/merchantBranch/listPosition`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.positions, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const fetchBranchStaffList = async () => {
  try {
    const res = await axios.get(`${API_URL}/merchantBranch/listStaff`);
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

const assignStaff = async (props, values) => {
  const API = `${API_URL}/merchantBranch/assignStaff`;
  try {
    const res = await axios.post(`${API}`, {
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

const blockCashierApi = async (apiType, id) => {
  let API = '';
  if (apiType === 'block') {
    API = 'blockCashier';
  } else {
    API = 'unblockCashier';
  }
  try {
    const res = await axios.post(`${API_URL}/merchantBranch/${API}`, {
      cashier_id: id,
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

const editBranch = async (props, values) => {
  console.log("click")
  // const token = localStorage.getItem('cashierLogged');
  // console.log(token)
  // const token = JSON.parse(localStorage.getItem(`branchLogged`));
  // console.log(token)
  // let tkvalue = token.token;
  // console.log(tkvalue)

  const API = 'editDetails';
  try {
    const res = await axios.post(`${API_URL}/merchantBranch/${API}`, {
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

export {
  branchFetchInvoicesBydate,
  editBranchCashier,
  getBranchCashier,
  fetchBranchStaffList,
  assignStaff,
  blockCashierApi,
  fetchDailyStats,
  editBranch,
  fetchInvoicesBydate,
  fetchInvoicesByPeriod,
  fetchInvoicesByDateRange,
  getMerchantSettings,
};
