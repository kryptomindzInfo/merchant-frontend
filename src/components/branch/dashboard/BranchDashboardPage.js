import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PaymentReceivedCard from '../../shared/PaymentReceivedCard';
import BranchCashierList from './BranchCashierList';
import { fetchDailyStats } from '../api/BranchAPI';
import Loader from '../../shared/Loader';

const BranchDashboardPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const { type } = props;
  const name = localStorage.getItem(`branch_name`);

  const refreshStats = async () => {
    setLoading(true);
    fetchDailyStats()
      .then((data) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  useEffect(() => {
    refreshStats();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

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
            {/* <PaymentReceivedCard amount={stats.todays_payment} /> */}
            <InvoiceNumberCard no={stats.bills_paid} />
            <PendingInvoiceCard no={stats.bills_raised - stats.bills_paid} />
            <OverDueInvoiceCard no={stats.due} />
          </Row>
          <BranchCashierList type={type} />
        </Main>
      </Container>
    </Fragment>
  );
};

export default BranchDashboardPage;
