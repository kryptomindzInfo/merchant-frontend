import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';

const fetchInvoicesBydate = async (date,type,id) => {
    try {
      const res = await axios.post(`${API_URL}/${type}/listStaffInvoicesByDate`, {
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
      const res = await axios.post(`${API_URL}/${type}/listStaffInvoicesByPeriod`, {
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
      const res = await axios.post(`${API_URL}/${type}/listStaffInvoicesByDateRange`, {
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
fetchInvoicesBydate,
fetchInvoicesByPeriod,
fetchInvoicesByDateRange,
getMerchantSettings,
};
