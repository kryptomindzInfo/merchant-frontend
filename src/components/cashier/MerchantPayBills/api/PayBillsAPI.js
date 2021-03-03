import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';

const getUserInvoices = async (mobile) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/getInvoicesByMobile`, {
      mobile,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.invoices, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

const getInvoiceDetails = async (number) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/getInvoicesByNumber`, {
      number,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.invoice, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

const getInvoiceByCustomerCode = async (customerCode, merchantId) => {
  try {
    const res = await axios.post(
      `${API_URL}/merchantStaff/getInvoicesByCustomerCode`,
      {
        customer_code: customerCode,
      },
    );
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.invoice, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

const payInvoice = async (values,fun,fun2) => {
  try {
    const res = await axios.post(`${API_URL}/merchantStaff/payInvoice`, {
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        fun2();
      } else {
        localStorage.setItem('txcode',res.data.transactionCode);
        fun2();
        fun();
        toast.success(res.data.message);
      }
    }
  } catch (err) {
    fun2();
    toast.error('Something went wrong');
  }
};

export {
  getUserInvoices,
  getInvoiceDetails,
  payInvoice,
  getInvoiceByCustomerCode,
};
