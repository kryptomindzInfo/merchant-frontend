import React, { useEffect } from 'react';
// import Container from '../../Container';
// import Main from '../../Main';
// import ActionBar from '../../ActionBar';
// import Card from '../../Card';
// import Table from '../../Table';
// import { STATIC_URL } from '../constants';
import Loader from '../../Loader';
import Wrapper from '../../Wrapper';
// import CashierHeader from '../../components/Header/CashierHeader';
// import SidebarCashier from '../../components/Sidebar/SidebarCashier';
// import { fetchCashierMerchantList } from './api/CashierMerchantAPI';
import PayBillPopup from './PayBillPopup';
// import Button from '../../components/Button';
// import { isNull } from 'lodash';
// import { API_URL } from '../constants';
// import axios from 'axios';

function MerchantPayBills(props) {
  const [addMerchantPopup, setAddMerchantPopup] = React.useState(false);
  const [payBillsPopup, setPayBillsPopup] = React.useState(true);
  const [merchantList, setMerchantList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingMerchant, setEditingMerchant] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [isClosed, setIsClosed] = React.useState(false);
  const logo = localStorage.getItem('bankLogo');
  const token = localStorage.getItem('cashierLogged');

  const handleMerchantPopupClick = (type, merchant) => {
    setEditingMerchant(merchant);
    setPopupType(type);
    setAddMerchantPopup(true);
  };

  const onPopupClose = () => {
    setAddMerchantPopup(false);
  };

  const onPayBillsPopupClose = () => {
    setPayBillsPopup(false);
    setEditingMerchant({});
  };


  useEffect(() => {
  }, []); // Or [] if effect doesn't need props or state

  
  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper from="branch">

      {payBillsPopup ? (
        <PayBillPopup
          close={() => onPayBillsPopupClose()}
          merchant={editingMerchant}
        />
      ) : (
        ''
      )}
    </Wrapper>
  );
}

export default MerchantPayBills;
