import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL, MERCHANT_API } from '../../constants';

const addBranchCashier = async (props, values) => {
  const API = `${API_URL}/merchantBranch/editCashier`;
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

const getBranchCashier = async () => {
  try {
    const res = await axios.get(`${API_URL}/merchantBranch/listCashier`);
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

// eslint-disable-next-line import/prefer-default-export
export { addBranchCashier, getBranchCashier, fetchBranchStaffList };
