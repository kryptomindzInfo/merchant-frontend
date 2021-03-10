import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';

const fetchCashierStats = async (type,id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/getMerchantCashierDashStats`,{
      staff_id:id,
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

const getCashierReport = async (after,before,type,id,bankId) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/queryMerchantCashierTransactionStates`, {
      bank_id: bankId,
      status: "2",
      staff_id:id,
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

const getCashierDailyReport = async (after,before,type,id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/getMerchantCashierDailyReport`, {
      start: after,
      end: before,
      staff_id:id,
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

const fetchInvoicesBydate = async (date,type,id) => {
    try {
      const res = await axios.post(`${API_URL}/${type}/listMerchantStaffInvoicesByDate`, {
        date: date,
        staff_id:id,
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

const fetchInvoicesByPeriod = async (start, end, type, id) => {
    try {
      const res = await axios.post(`${API_URL}/${type}/listMerchantStaffInvoicesByPeriod`, {
        start_date: start,
        end_date:end,
        staff_id:id,
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
  
const fetchInvoicesByDateRange = async (start, end, type, id) => {
    try {
      const res = await axios.post(`${API_URL}/${type}/listMerchantStaffInvoicesByDateRange`, {
        start_date: start,
        end_date:end,
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

const getMerchantSettings = async (type) => {
    try {
      const res = await axios.post(`${API_URL}/${type}/getSettings`, {});
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
getCashierDailyReport,
fetchCashierStats,
getCashierReport,
fetchInvoicesBydate,
fetchInvoicesByPeriod,
fetchInvoicesByDateRange,
getMerchantSettings,
};
