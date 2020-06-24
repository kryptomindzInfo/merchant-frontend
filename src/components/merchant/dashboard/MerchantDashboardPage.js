import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PaymentReceivedCard from '../../shared/PaymentReceivedCard';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';
import HistoryCard from './HistoryCard';

import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import ZoneCard from './ZoneCard';

const MerchantDashboardPage = () => {
  const merchantDetails = JSON.parse(localStorage.getItem('merchantLogged'))
    .details;
  const noOfInvoicesPaid = parseFloat(merchantDetails.bills_paid);
  const noOfPendingInvoices = parseFloat(
    merchantDetails.bills_raised - merchantDetails.bills_paid,
  );
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
            <PaymentReceivedCard amount="0" />
            <InvoiceNumberCard amount={noOfInvoicesPaid} />
            <PendingInvoiceCard amount={noOfPendingInvoices} />
            <OverDueInvoiceCard />
          </Row>
          <ZoneCard />
          <HistoryCard />
        </Main>
      </Container>
    </Fragment>
  );
};

export default MerchantDashboardPage;
