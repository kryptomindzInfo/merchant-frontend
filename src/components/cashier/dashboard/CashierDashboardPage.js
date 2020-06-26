import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import GroupListCard from './GroupListCard';

import CashierHeader from '../../shared/headers/cashier/CashierHeader';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import GroupNumberCard from '../../shared/GroupNumberCard';
import { fetchGroups, fetchStats } from '../api/CashierAPI';
import Loader from '../../shared/Loader';

const CashierDashboardPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );
  const [stats, setStats] = useState({});

  const getStats = () => {
    setLoading(true);
    fetchStats()
      .then((data) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getStats();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard | CASHIER | E-WALLET </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <CashierHeader active="dashboard" />
      <Container verticalMargin>
        <Main fullWidth>
          <Row>
            <GroupNumberCard no={groupList.length} />
            <InvoiceNumberCard no={stats.bills_paid} />
            <PendingInvoiceCard no={stats.bills_raised - stats.bills_paid} />
          </Row>
          <GroupListCard setLoading={(val) => {}} />
        </Main>
      </Container>
    </Fragment>
  );
};

export default CashierDashboardPage;
