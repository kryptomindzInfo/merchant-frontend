import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import GroupListCard from './GroupListCard';

import CashierHeader from '../../shared/headers/cashier/CashierHeader';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import GroupNumberCard from '../../shared/GroupNumberCard';
import CreateGroupCard from './CreateGroupCard';

const CashierDashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Cashier | Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <CashierHeader />
      <Container verticalMargin>
        <Main fullWidth>
          <Row>
            <GroupNumberCard />
            <InvoiceNumberCard />
            <PendingInvoiceCard />
            <CreateGroupCard />
          </Row>
          <GroupListCard />
        </Main>
      </Container>
    </Fragment>
  );
};

export default CashierDashboard;
