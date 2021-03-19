import axios from 'axios';
import { MERCHANT_API, API_URL } from '../../constants';
import notify from '../../utils/Notify';

// API's for Merchant Dashboard


const getzone = async () => {
  try {
    const res = await axios.get(`${MERCHANT_API}/getZone`);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return 0;
      }
      return res.data.zone;
    }
  } catch (e) {
    notify('Could not fetch balance!', 'error');
    return 0;
  }
};

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

const fetchTypeList = async (id,type) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/get${type}List`,{ merchant_id: id });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.list, loading: false };
    }
  } catch (e) {
    notify('Could not fetch zones!', 'error');
    return { list: [], loading: false };
  }
};

// API's for Merchant Subzones

const fetchSubzoneListByZone = async (zoneId) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listSubzonesByZoneId`, {
      zone_id: zoneId,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.subzones, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const subzoneAPI = async (props, values, apiType) => {
  let API = '';
  if (apiType === 'update') {
    API = '/editSubzone';
  } else {
    API = '/createSubzone';
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
        props.refreshSubzoneList(res.data.data);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong', 'error');
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

const fetchBranchListBySubzone = async (subzoneId) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listBranchesBySubzoneId`, {
      subzone_id: subzoneId,
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

const fetchStaffList = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listStaff`,{merchant_id:id});
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
  console.log(offeringList)
  console.log(props)
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

const fetchOfferingList = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listOfferings`, {merchant_id:id});
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
const fetchTaxList = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listTaxes`, {merchant_id:id});
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

// API's for Merchant Customers
const fetchCustomerList = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listCustomers`, {merchant_id:id});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.customers, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const uploadCustomer = async (props, customerList) => {
  try {
    const res = await axios.post(
      `${MERCHANT_API}/uploadCustomers`,
      customerList,
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshCustomerList();
        props.onClose();
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
  console.log("merchant value")
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

const getPenaltyRule = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/getSettings`, {merchant_id:id});
    if (res.status === 200) {
      if (res.data.status === 0) {
        return { penalty_rule: {}, loading: false };
      }
      return {
        penalty_rule: res.data.setting.penalty_rule,
        loading: false,
      };
    }
    return { penalty_rule: {}, loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { penalty_rule: {}, loading: false };
  }
};

const PenaltyRule = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/editPenaltyRule`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshpenaltyrule(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const getBillTerms = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/getSettings`, {merchant_id:id});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], default_bill_term: {}, loading: false };
      }
      return {
        list: res.data.setting.bill_term,
        default_bill_term: res.data.setting.default_bill_term,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
    return { list: [], default_bill_term: {}, loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], default_bill_term: {}, loading: false };
  }
};

const addBillTerm = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/addBillTerm`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshbilltermlist(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const getBillPeriods = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/getSettings`, {merchant_id:id});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], default_bill_period: {}, loading: false };
      }
      return {
        list: res.data.setting.bill_period,
        default_bill_period: res.data.setting.default_bill_period,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
    return { list: [], default_bill_period: {}, loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], default_bill_period: {}, loading: false };
  }
};

const getCategories = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listInvoiceGroups`, {merchant_id:id});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return {
        list: res.data.groups,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const addBillPeriod = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/addBillPeriod`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshbillperiodlist(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const addCategory = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/createInvoiceGroup`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshcategorylist(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const setDefaultBillPeriod = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/setDefaultBillPeriod`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshbillperiodlist(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const setDefaultBillTerm = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/setDefaultBillTerm`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshbilltermlist(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const checkSubZoneStats = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/getSubZoneStats`,{
      subzone_id:id,
    });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
					amount_generated: 0,
					bill_generated: 0,
					amount_paid: 0,
        };
      }
      return { 
        bill_generated: res.data.bill_generated,
        amount_generated: res.data.amount_generated,
        amount_paid: res.data.amount_paid,
        bill_paid: res.data.bill_paid,
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
    };
  }
};

const checkZoneStats = async (zoneid) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/getZoneStats`,{
      zone_id:zoneid,
    });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
					amount_generated: 0,
					bill_generated: 0,
					amount_paid: 0,
          amount_pending: 0,
          bill_pending: 0,
        };
      }
      return { 
        bill_generated: res.data.bill_generated,
        amount_generated: res.data.amount_generated,
        amount_paid: res.data.amount_paid,
        bill_paid: res.data.bill_paid,
        amount_pending: res.data.amount_pending,
        bill_pending: res.data.bill_pending,
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      amount_pending: 0,
      bill_pending: 0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      amount_pending: 0,
      bill_pending: 0,
    };
  }
};

const checkStatsbydate = async (id,date,type) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/${type}/getStatsBydate`,{
      id:id,
      date:date,
    });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
					amount_generated: 0,
					bill_generated: 0,
					amount_paid: 0,
          bill_paid_by_MC:0,
          amount_paid_by_MC:0,
          bill_paid_by_BC:0,
          amount_paid_by_BC:0,
          bill_paid_by_PC:0,
          amount_paid_by_PC:0,
          bill_paid_by_US:0,
          amount_paid_by_US:0,
        };
      }
      return { 
        bill_generated: res.data.bill_generated,
        amount_generated: res.data.amount_generated,
        amount_paid: res.data.amount_paid,
        bill_paid: res.data.bill_paid,
        bill_paid_by_MC:res.data.bill_paid_by_MC,
        amount_paid_by_MC:res.data.amount_paid_by_MC,
        bill_paid_by_BC:res.data.bill_paid_by_BC,
        amount_paid_by_BC:res.data.amount_paid_by_BC,
        bill_paid_by_PC:res.data.bill_paid_by_PC,
        amount_paid_by_PC:res.data.amount_paid_by_PC,
        bill_paid_by_US:res.data.bill_paid_by_US,
        amount_paid_by_US:res.data.amount_paid_by_US,
        
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
      amount_paid_by_MC:0,
      bill_paid_by_BC:0,
      amount_paid_by_BC:0,
      bill_paid_by_PC:0,
      amount_paid_by_PC:0,
      bill_paid_by_US:0,
      amount_paid_by_US:0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
      amount_paid_by_MC:0,
      bill_paid_by_BC:0,
      amount_paid_by_BC:0,
      bill_paid_by_PC:0,
      amount_paid_by_PC:0,
      bill_paid_by_US:0,
      amount_paid_by_US:0,
    };
  }
};

const checkStatsbyperiod = async (id,period,type) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/${type}/getStatsByPeriod`,{
      id:id,
      period_name:period,
    });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
					amount_generated: 0,
					bill_generated: 0,
					amount_paid: 0,
          bill_paid_by_MC:0,
          amount_paid_by_MC:0,
          bill_paid_by_BC:0,
          amount_paid_by_BC:0,
          bill_paid_by_PC:0,
          amount_paid_by_PC:0,
          bill_paid_by_US:0,
          amount_paid_by_US:0,
        };
      }
      return { 
        bill_generated: res.data.bill_generated,
        amount_generated: res.data.amount_generated,
        amount_paid: res.data.amount_paid,
        bill_paid: res.data.bill_paid,
        bill_paid_by_MC:res.data.bill_paid_by_MC,
        amount_paid_by_MC:res.data.amount_paid_by_MC,
        bill_paid_by_BC:res.data.bill_paid_by_BC,
        amount_paid_by_BC:res.data.amount_paid_by_BC,
        bill_paid_by_PC:res.data.bill_paid_by_PC,
        amount_paid_by_PC:res.data.amount_paid_by_PC,
        bill_paid_by_US:res.data.bill_paid_by_US,
        amount_paid_by_US:res.data.amount_paid_by_US,
        
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
          amount_paid_by_MC:0,
          bill_paid_by_BC:0,
          amount_paid_by_BC:0,
          bill_paid_by_PC:0,
          amount_paid_by_PC:0,
          bill_paid_by_US:0,
          amount_paid_by_US:0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
      amount_paid_by_MC:0,
      bill_paid_by_BC:0,
      amount_paid_by_BC:0,
      bill_paid_by_PC:0,
      amount_paid_by_PC:0,
      bill_paid_by_US:0,
      amount_paid_by_US:0,
    };
  }
};

const getZoneDetails = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/getSettings`, { merchant_id: id});
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return {
          zone_name: 'Zone',
          subzone_name: 'Sub zone',
          loading: false,
        };
      }
      return {
        zone_name: res.data.setting.zone_name,
        subzone_name: res.data.setting.subzone_name,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
    return {
      zone_name: 'Zone',
      subzone_name: 'Sub zone',
      loading: false,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return {
      zone_name: 'Zone',
      subzone_name: 'Sub zone',
      loading: false,
    };
  }
};

const ZoneDetails = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/zoneSetting`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreszonedetails(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const BillDetails = async (props, values) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/billNumberSetting`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreszonedetails(values);
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

const getRules = async (ruleType, type) => {
  try {
    let URL = '';
    if (type === 'interbank') {
      URL = `${MERCHANT_API}/interBank/getRules`;
    } else {
      URL = `${MERCHANT_API}/getRules`;
    }
    const res = await axios.post(URL, { page: ruleType });
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

const ruleAPI = async (bank, ruleStatus, payload) => {
  let URL = '';
  if (bank === 'interbank') {
    URL = `${MERCHANT_API}/merchantRule/interBank/${ruleStatus}`;
  } else {
    URL = `${MERCHANT_API}/merchantRule/${ruleStatus}`;
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

const merchantStaffPositionAPI = async (props, values, apiType) => {
  let URL = '';
  if (apiType === 'update') {
    URL = `${MERCHANT_API}/editPosition`;
  } else {
    URL = `${MERCHANT_API}/addPosition`;
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

const getMerchantPositions = async (id) => {
  try {
    const res = await axios.post(`${MERCHANT_API}/listPosition`, {
      branch_id: id,
    });
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

export {
  checkStatsbyperiod,
  checkStatsbydate,
  checkSubZoneStats,
  checkZoneStats,
  addCategory,
  getCategories,
  getzone,
  branchAPI,
  fetchBranchList,
  staffAPI,
  blockStaffAPI,
  getWalletBalance,
  zoneAPI,
  fetchTypeList,
  fetchStaffList,
  fetchDashboardHistory,
  editMerchant,
  getRules,
  ruleAPI,
  blockMerchantBranch,
  unblockMerchantBranch,
  merchantStaffPositionAPI,
  getMerchantPositions,
  uploadOffering,
  fetchOfferingList,
  deleteOffering,
  editOffering,
  fetchTaxList,
  createTax,
  editTax,
  deleteTax,
  fetchBranchListBySubzone,
  fetchSubzoneListByZone,
  subzoneAPI,
  getBillTerms,
  addBillTerm,
  addBillPeriod,
  getBillPeriods,
  getZoneDetails,
  ZoneDetails,
  setDefaultBillPeriod,
  setDefaultBillTerm,
  getPenaltyRule,
  PenaltyRule,
  uploadCustomer,
  fetchCustomerList,
  BillDetails,
};
