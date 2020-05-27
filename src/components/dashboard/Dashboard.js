import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PaymentRecivedCard from '../utils/PaymentRecivedCard';
import InvoiceNumberCard from '../utils/InvoiceNumberCard';
import PendingInvoiceCard from '../utils/PendingInvoiceCard';
import OverDueInvoiceCard from '../utils/OverDueInvoiceCard';
import HistoryCard from './HistoryCard';

import MerchantHeader from '../shared/headers/merchant/MerchantHeader';
import Container from '../shared/Container';
import Row from '../shared/Row';
import Main from '../shared/Main';
import SideBar from '../shared/SideBar';

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <MerchantHeader />
      <Container verticalMargin>
        <SideBar />
        <Main>
          <Row>
            <PaymentRecivedCard />
            <InvoiceNumberCard />
            <PendingInvoiceCard />
            <OverDueInvoiceCard />
          </Row>
          <HistoryCard />
        </Main>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
