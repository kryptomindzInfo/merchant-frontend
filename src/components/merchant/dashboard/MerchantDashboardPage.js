import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PaymentReceivedCard from '../../shared/PaymentReceivedCard';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';

import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import ZoneCard from './ZoneCard';
import Loader from '../../shared/Loader';
import { getzone } from '../api/MerchantAPI';

const MerchantDashboardPage = () => {
  const [isLoading, setLoading] = useState(false);
  const merchantDetails = JSON.parse(localStorage.getItem('merchantLogged'))
    .details;
  const noOfInvoicesPaid = parseFloat(merchantDetails.bills_paid);
  const noOfPendingInvoices = parseFloat(
    merchantDetails.bills_raised - merchantDetails.bills_paid,
  );
  const amount = parseFloat(0);
  const overDueInvoices = 0;

  const refreshPage = () => {
    setLoading(false);
  };

  useEffect(() => {
    console.log(merchantDetails);
    setLoading(true);
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
            <PaymentReceivedCard amount={amount} />
            <InvoiceNumberCard no={noOfInvoicesPaid} />
            <PendingInvoiceCard no={noOfPendingInvoices} />
            <OverDueInvoiceCard no={overDueInvoices} />
          </Row>
          <ZoneCard refreshZone={() => refreshPage()} />
          {/* <HistoryCard /> */}
        </Main>
      </Container>
    </Fragment>
  );
};

export default MerchantDashboardPage;
