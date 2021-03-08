import axios from 'axios';
import Papa from 'papaparse';
import { API_URL } from '../../constants';
import notify from '../../utils/Notify';
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'



const getCashierReport = async (after,before) => {
    try {
      const res = await axios.post(`${API_URL}/merchantStaff/queryTransactionStates`, {
        bank_id: JSON.parse(localStorage.getItem('cashierLogged')).merchant.bank_id,
        status: "2",
        date_after: after,
        date_before: before,
        page_start: 0,
        limit: 100
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.message, 'error');
          return { data: {}, loading: false };
        }
        return { data: res.data, loading: false };
      }
      notify(res.data.message, 'error');
      return { data: {}, loading: false };
    } catch (err) {
      notify('Something went wrong', 'error');
      return { data: {}, loading: false };
    }
  };

  const getCashierDailyReport = async (after,before) => {
    try {
      const res = await axios.post(`${API_URL}/merchantStaff/getDailyReport`, {
        start: after,
        end: before,
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
          notify(res.data.message, 'error');
          return { data: {}, loading: false };
        }
        return { data: res.data, loading: false };
      }
      notify(res.data.message, 'error');
      return { data: {}, loading: false };
    } catch (err) {
      notify('Something went wrong', 'error');
      return { data: {}, loading: false };
    }
  };

const getCountries = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-country`);
    if (res.data[0].country_list.length !== 0) {
      return { list: res.data[0].country_list, loading: false };
    }
    return { list: [], loading: false };
  } catch (err) {
    return { list: [], loading: false };
  }
};

const getCounter = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantStaff/getPositionDetails`,
      {},
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      }
      return {
        counter: res.data.position.counter,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const getinfo = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/getPositionDetails`, {});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      }
      return {
        access: res.data.position.counter_invoice_access,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const setCounter = async (props, values) => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantStaff/billNumberSetting`,
      {
        ...values,
      },
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refresbillnumber();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const incCounter = async (props) => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantStaff/increaseCounter`,
      {},
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshInvoiceList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const fetchGroups = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/listInvoiceGroups`,
    {
      merchant_id: id
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.groups, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const fetchStats = async (type) => {
  try {
    const res = await axios.get(`${API_URL}/merchantStaff/${type}DashStatus`);
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

const fetchstaffStats = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/staffDashStatus`,
    {
      group_id: id,
    });
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

const fetchCashierStats = async (type) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/getCashierDashStats`);
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


const generateStaffOTP = async (email,mobile,otpOpt,otpTxt) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/sendOTP`,{
      email: email,
      mobile: mobile,
      page: otpOpt,
      type: 'cashier',
      txt: otpTxt,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      }else{
        notify(res.data.message, 'success');
        return res;
      }
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const openStaff = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/openstaff`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      }else{
        notify(res.data.message, 'success');
      }
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const closeStaff = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/closestaff`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      }else{
        notify(res.data.message, 'success');
      }
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const groupAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = 'editInvoiceGroup';
  } else {
    API = 'createInvoiceGroup';
  }
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/${API}`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshGroupList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong', 'error');
  }
};

// Invoice APIs
const fetchInvoicesBydate = async (date) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/listInvoicesByDate`, {
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
    const res = await axios.post(`${API_URL}/merchantStaff/listInvoicesByPeriod`, {
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
    const res = await axios.post(`${API_URL}/merchantStaff/listInvoicesByDateRange`, {
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

const fetchInvoices = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/listInvoices`, {
      group_id: id,
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

const fetchPaidInvoices = async () => {
  const start = startOfDay(new Date());
  const end = endOfDay(new Date());

  try {
    const res = await axios.post(`${API_URL}/merchantStaff/searchPaidInvoiceList`, {
      from_date: start,
      to_date: end,
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

const uploadInvoice = async (props, invoiceList) => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantStaff/uploadInvoices`,
      invoiceList,
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshInvoiceList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const createInvoice = async (props, values, type) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/createInvoice`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        if (type === 'draft' || props.mode !== 'invoice') {
          props.refreshInvoiceList();
          props.onClose();
        }
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const createCounterInvoice = async (props, values) => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantStaff/createCounterInvoice`,
      {
        ...values,
      },
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshInvoiceList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const createCustomer = async (props, values) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/createCustomer`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (err) {
    notify('Something went wrong', 'error');
  }
};

const invoiceApi = async (props, values, type) => {
  let API = '';
  if (type === 'update') {
    API = 'editInvoice';
  }
  if (type === 'delete') {
    API = 'deleteInvoice';
  }
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/${API}`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        if (type === 'update') {
          props.refreshInvoiceList(res.data.data);
          props.onClose();
        }
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong', 'error');
  }
};

const triggerCsvBrowse = (inp) => {
  const input = document.getElementById(inp);
  input.click();
};

const processJson = (e, sendResult) => {
  if (e.target.files && e.target.files[0] != null) {
    return Papa.unparse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function demo(results) {
        if (results.errors && results.errors.length > 0) {
          notify(
            'Error parsing csv file. Please check the format and try again.',
            'error',
          );
        }
        sendResult(results.data);
      },
    });
  }
};

const processCsv = (e, sendResult) => {
  if (e.target.files && e.target.files[0] != null) {
    return Papa.parse(e.target.files[0], {
      worker: true,
      header: true,
      skipEmptyLines: true,
      complete: async function demo(results) {
        if (results.errors && results.errors.length > 0) {
          notify(
            'Error parsing csv file. Please check the format and try again.',
            'error',
          );
        }
        sendResult(results.data);
      },
    });
  }
};

const fetchTaxList = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/listTaxes`, {});
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

const fetchOfferingList = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantStaff/listOfferings`,
      {},
    );
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

const onCsvFileChange = (e) => {
  let parsedData = [];
  processCsv(e, function demo(data) {
    parsedData = data;
  });
  return parsedData;
};

const getMerchantSettings = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/getSettings`, {});
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

export {
  fetchstaffStats,
  fetchInvoicesByDateRange,
  fetchInvoicesByPeriod,
  getCashierDailyReport,
  fetchCashierStats,
  generateStaffOTP,
  getCashierReport,
  fetchInvoicesBydate,
  openStaff,
  closeStaff,
  incCounter,
  setCounter,
  getCounter,
  fetchGroups,
  groupAPI,
  fetchInvoices,
  fetchPaidInvoices,
  uploadInvoice,
  invoiceApi,
  fetchStats,
  triggerCsvBrowse,
  onCsvFileChange,
  processCsv,
  processJson,
  fetchTaxList,
  fetchOfferingList,
  getMerchantSettings,
  createInvoice,
  createCustomer,
  createCounterInvoice,
  getCountries,
  getinfo,
};
