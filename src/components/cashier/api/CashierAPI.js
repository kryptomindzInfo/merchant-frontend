import axios from 'axios';
import Papa from 'papaparse';
import { API_URL } from '../../constants';
import notify from '../../utils/Notify';

const getCountries = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-country`);
    if (res.data[0].country_list.length !== 0) {
      return { list: res.data[0].country_list, loading: false };
    }
    return { list: [], loading: false };
  } catch (err) {
    console.log(err.messages);
    return { list: [], loading: false };
  }
};

const getCounter = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantCashier/getCashierSettings`,
      {},
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      }
      return {
        counter: res.data.setting.counter,
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
      `${API_URL}/merchantCashier/billNumberSetting`,
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
      `${API_URL}/merchantCashier/increaseCounter`,
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
    console.log(err);
    notify('Something went wrong', 'error');
  }
};

const fetchGroups = async () => {
  try {
    const res = await axios.get(`${API_URL}/merchantCashier/listInvoiceGroups`);
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

const fetchStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/merchantCashier/todaysStatus`);
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

const groupAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = 'editInvoiceGroup';
  } else {
    API = 'createInvoiceGroup';
  }
  try {
    const res = await axios.post(`${API_URL}/merchantCashier/${API}`, {
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

const fetchInvoices = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/merchantCashier/listInvoices`, {
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

const uploadInvoice = async (props, invoiceList) => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantCashier/uploadInvoices`,
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
    const res = await axios.post(`${API_URL}/merchantCashier/createInvoice`, {
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
      `${API_URL}/merchantCashier/createCounterInvoice`,
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
    const res = await axios.post(`${API_URL}/merchantCashier/createCustomer`, {
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
    const res = await axios.post(`${API_URL}/merchantCashier/${API}`, {
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
        console.log(results.data);
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
    const res = await axios.post(`${API_URL}/merchantCashier/listTaxes`, {});
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
      `${API_URL}/merchantCashier/listOfferings`,
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
    const res = await axios.post(`${API_URL}/merchantCashier/getSettings`, {});
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
      loading: false,
    };
  }
};

export {
  incCounter,
  setCounter,
  getCounter,
  fetchGroups,
  groupAPI,
  fetchInvoices,
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
};
