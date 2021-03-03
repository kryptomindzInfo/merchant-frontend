import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import PaidInvoiceCard from '../../shared/PaidInvoiceCard';
import TotalAmountCollectedCard from '../../shared/TotalAmountCollectedCard';
import TotalPenaltyCollectedCard from '../../shared/TotalPenaltyCollectedCard';
import InvoiceListCard from './InvoiceListCard';
import SidebarCashier from '../../shared/sidebars/SidebarCashier';

import Footer from '../../Footer';
import CashierHeader from '../../shared/headers/cashier/CashierHeader';
import Container from '../../shared/Container';
import Card from '../../shared/Card';
import Col from '../../shared/Col';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import GroupNumberCard from '../../shared/GroupNumberCard';
import { fetchGroups, fetchStats } from '../api/CashierAPI';
import Loader from '../../shared/Loader';

const StaffDashboardPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );
  const [stats, setStats] = useState({});

  const getStats = () => {
    fetchStats('cashier')
      .then((data) => {
        setStats(data.stats);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const status = () => {
    setInterval(function(){
      getStats();
     }, 3000);
  };

  useEffect(() => {
    status();      
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Merchant Dashboard | Cashier | E-WALLET </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <CashierHeader active="dashboard" />
      <Container verticalMargin>
        <SidebarCashier/>
        <Main>
          <Row>
          <Col cW="100%">
          <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Opening Balance</h4>
              <div className="cardValue">XOF 100000</div>
              </Card>
           </Col>
            
            <TotalAmountCollectedCard amount={stats.amount_collected} />
            <TotalPenaltyCollectedCard penalty={stats.penalty_collected} />
            <PaidInvoiceCard no={stats.bills_paid} />
          </Row>
          <InvoiceListCard setLoading={(val) => {}} invoice={setInvoiceList} />
        </Main>
      </Container>
      <Footer />
      
    </Fragment>
  );
};

export default StaffDashboardPage;