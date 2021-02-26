import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PaymentReceivedCard from '../../shared/PaymentReceivedCard';
import TotalInvoiceCard from '../../shared/TotalInvoiceCard';
import PaidInvoiceCard from '../../shared/PaidInvoiceCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';

import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import ZoneCard from './ZoneCard';
import Loader from '../../shared/Loader';
import { getzone } from '../api/MerchantAPI';
import axios from 'axios';
import { MERCHANT_API } from '../../constants';
import notify from '../../utils/Notify';

const MerchantDashboardPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [invoicesPaid, setInvoicesPaid] = useState(0);
  const [pendingInvoices,setPendingInvoices] = useState(0);
  const [amountCollected,setAmpontCollected] = useState(0);
  const [invoicesRaised,setInvoicesRaised] = useState(0);

  const refreshPage = () => {
    setLoading(false);
  };

  const getStats = () => {
    axios
    .post(`${MERCHANT_API}/getDashStats`,{})
      .then(res => {
        if (res.status == 200) {
          if (res.data.status===0) {
            throw res.data.error;
          } else {
            console.log(res);
            setInvoicesPaid(res.data.bills_paid);
            setPendingInvoices(res.data.bills_raised-res.data.bills_paid);
            setAmpontCollected(res.data.amount_collected);
            setInvoicesRaised(res.data.amount_due);
          }
        }
      })
      .then(res => {
        setTimeout(function() {
          getStats();
        }, 3000);
      })
      .catch(err => {
        setTimeout(function() {
          getStats();
        }, 3000);
      });
  }

  useEffect(() => {
    setLoading(true);
    getStats();
    refreshPage();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Fragment>
      <Helmet>
        <title>Merchant | Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <MerchantHeader active="dashboard" />
      <Container verticalMargin>
        <MerchantSideBar />
        <Main>
          <Row>
            <PaymentReceivedCard amount={amountCollected} />
            <TotalInvoiceCard no={invoicesRaised} />
            <PaidInvoiceCard no={invoicesPaid} />
            <PendingInvoiceCard no={pendingInvoices} />
          </Row>
        </Main>
        <ZoneCard refreshZone={() => refreshPage()} />
      </Container>
    </Fragment>
  );
};

export default MerchantDashboardPage;
