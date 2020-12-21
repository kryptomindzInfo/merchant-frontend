import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';

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
  editBranchCashier,
  getBranchCashier,
  fetchBranchStaffList,
  assignStaff,
  blockCashierApi,
  fetchDailyStats,
  editBranch,
};
