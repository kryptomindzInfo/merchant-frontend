import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';

//const token = 'D2N2cgDpRz';
// const token = localStorage.getItem('cashierLogged');

const getPenaltyRule = async () => {
  try {
    const res = await axios.post(`${API_URL}/merchantCashier/getSettings`, {});
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { rule: {}, loading: false };
      }
      return { rule: res.data.setting.penalty_rule, loading: false };
    }
    toast.error(res.data.message);
    return { rule: {}, loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { rule: {}, loading: false };
  }
};

const checkCashierFee = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/merchantCashier/checkMerchantFee`, {
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { fee: {}, loading: false };
      }
      return { fee: res.data.fee, loading: false };
    }
    toast.error(res.data.message);
    return { fee: {}, loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { fee: {}, loading: false };
  }
};

export { checkCashierFee, getPenaltyRule };
