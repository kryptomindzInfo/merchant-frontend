import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PaymentRecivedCard from '../../shared/PaymentRecivedCard';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';
import HistoryCard from './HistoryCard';

import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import SideBar from '../../shared/SideBar';

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Mercahant | Dashboard</title>
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
