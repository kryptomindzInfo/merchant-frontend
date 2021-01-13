import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';
import BranchInvoiceNumberCard from '../../shared/BranchInvoiceNumberCard';
import BranchPaymentReceivedCard from '../../shared/BranchPaymentReceivedCard';
import BranchCashierList from './BranchCashierList';
import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';
import { fetchDailyStats } from '../api/BranchAPI';
import Loader from '../../shared/Loader';

const BranchDashboardPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const { type } = props;
  const name = localStorage.getItem(`branch_name`);

  const getStats = () => {
    axios
    .get(`${API_URL}/merchantBranch/todaysStatus`,{})
      .then(res => {
        if (res.status == 200) {
          if (res.data.status===0) {
            throw res.data.error;
          } else {
            setStats(res.data);
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
    getStats();
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
            <BranchPaymentReceivedCard amount={stats.todays_payment} />
            <OverDueInvoiceCard amountdue={stats.due} />
            <BranchInvoiceNumberCard no={stats.bills_paid} />
            <PendingInvoiceCard no={stats.bills_raised - stats.bills_paid} />
          </Row>
          <BranchCashierList type={type} />
        </Main>
      </Container>
    </Fragment>
  );
};

export default BranchDashboardPage;
