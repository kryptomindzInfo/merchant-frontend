import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PaymentRecivedCard from '../../shared/PaymentRecivedCard';
import CashierList from './CashierList';

const BranchDashboardPage = (props) => {
  const { type } = props;
  const name = localStorage.getItem(`branch_name`);

  return (
    <Fragment>
      <Helmet>
        <title>Branch | {name.toUpperCase()} | Dashboard </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <BranchHeader active="dashboard" />
      <Container verticalMargin>
        <Main fullWidth>
          <Row textAlign="start" justify="start">
            <PaymentRecivedCard />
            <InvoiceNumberCard amount={500} />
            <PendingInvoiceCard amount={530} />
            <OverDueInvoiceCard />
          </Row>
          <CashierList type={type} />
        </Main>
      </Container>
    </Fragment>
  );
};

export default BranchDashboardPage;
