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

const fetchBranchInvoicesBydate = async (date, type, id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/listMerchantBranchInvoicesByDate`, {
      date: date,
      branch_id: id,
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
const fetchBranchInvoicesByPeriod = async (start, end, type, id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/listMerchantBranchInvoicesByPeriod`, {
      start_date: start,
      end_date:end,
      branch_id: id,
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

const fetchBranchInvoicesByDateRange = async (start, end, type, id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/listMerchantBranchInvoicesByDateRange`, {
      start_date: start,
      end_date:end,
      branch_id: id,
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

const fetchBranchStaffList = async (type, id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/listMerchantStaff`,{
      branch_id: id,
    });
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

const getBranchCashier = async (type, id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/listMerchantPosition`,{
      branch_id: id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { 
        cashiers: res.data.positions.filter((u) => u.type === 'cashier'),
        staffs: res.data.positions.filter((u) => u.type === 'staff')
      };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const checkCashierStats = async (type, id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/merchantCashierStats`,{
      cashier_id:id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
					amount_collected: 0,
					penalty_collected: 0,
					cash_in_hand: 0,
					opening_balance: 0,
          opening_time: new Date(),
          closing_balance: 0,
          closing_time: new Date(),
          discrepancy: 0,
        };
      }
      return { 
        bills_paid: res.data.bills_paid,
        amount_collected: res.data.amount_collected,
        penalty_collected: res.data.penalty_collected,
        cash_in_hand: res.data.cash_in_hand,
        opening_balance: res.data.opening_balance,
        opening_time: res.data.opening_time,
        closing_balance: res.data.closing_balance,
        closing_time: res.data.closing_time,
        discrepancy: res.data.discrepancy,
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
      amount_collected: 0,
      penalty_collected: 0,
      cash_in_hand: 0,
      opening_balance: 0,
      opening_time: new Date(),
      closing_balance: 0,
      closing_time: new Date(),
      discrepancy: 0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
      amount_collected: 0,
      penalty_collected: 0,
      cash_in_hand: 0,
      opening_balance: 0,
      opening_time: new Date(),
      closing_balance: 0,
      closing_time: new Date(),
      discrepancy: 0,
    };
  }
};

const checkStaffStats = async (type,id) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/merchantStaffStats`,{
      staff_id:id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
          bills_created:0,
          counter_invoices: 0,
          opening_time: new Date(),
          closing_time: new Date(),
          bills_uploaded:0,
        };
      }
      return { 
        bills_paid: res.data.bills_paid,
        bills_created: res.data.bills_created,
        counter_invoices: res.data.counter_invoices,
        bills_uploaded: res.data.bills_uploaded,
        opening_time: res.data.opening_time,
        closing_time:  res.data.closing_time,
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
      bills_created:0,
      counter_invoices: 0,
      opening_time: new Date(),
      closing_time: new Date(),
      bills_uploaded:0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
      bills_created:0,
      counter_invoices: 0,
      opening_time: new Date(),
      closing_time: new Date(),
      bills_uploaded:0,
    };
  }
};

export {
  checkStaffStats,
  checkCashierStats,
  getBranchCashier,
  fetchBranchStaffList,
  getCashierDailyReport,
  fetchCashierStats,
  getCashierReport,
  fetchInvoicesBydate,
  fetchInvoicesByPeriod,
  fetchInvoicesByDateRange,
  getMerchantSettings,
  fetchBranchInvoicesBydate,
  fetchBranchInvoicesByPeriod,
  fetchBranchInvoicesByDateRange,
};
