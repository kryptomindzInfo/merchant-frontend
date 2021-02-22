import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import GroupListCard from './GroupListCard';
import Sidebar from '../../shared/sidebars/Sidebar';

import StaffHeader from '../../shared/headers/cashier/StaffHeader';
import Container from '../../shared/Container';
import Card from '../../shared/Card';
import Col from '../../shared/Col';
import Row from '../../shared/Row';
import Button from '../../shared/Button';
import Main from '../../shared/Main';
import GroupNumberCard from '../../shared/GroupNumberCard';
import { fetchGroups, fetchStats, openStaff, closeStaff} from '../api/CashierAPI';
import Loader from '../../shared/Loader';

const StaffDashboardPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );
  const [stats, setStats] = useState({});

  const getStats = () => {
    setLoading(true);
    fetchStats('staff')
      .then((data) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const open = () => {
    setLoading(true);
    openStaff()
      .then((data) => {
        getStats();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const close = () => {
    setLoading(true);
    closeStaff()
      .then((data) => {
        getStats();
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
        <title>Merchant Dashboard | STAFF | E-WALLET </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <StaffHeader active="dashboard" />
      <Container verticalMargin>
      <Sidebar marginRight>
        <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          stats.is_closed? (
              <Button
                dashBtn
                onClick={()=>open()}
              >
                  Open My Counter
              </Button>
            ) : (
                <Button dashBtn disabled>
                  Open My Counter
                </Button>
              )}
          </Col>
        </Row>
        <Row style={{ marginTop: '75%' }}>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          !stats.is_closed? (
              <Button
                dashBtn
                onClick={()=>close()}
              >
                  Close my day
              </Button>
            ) : (
                <Button dashBtn disabled>
                  Close my day
                </Button>
              )}
          </Col>
        </Row>
        </Card>
      </Sidebar>
        <Main>
          <Row>
            <InvoiceNumberCard no={stats.counter_invoices} />
            <GroupNumberCard no={groupList.length} />
            <PendingInvoiceCard no={stats.bills_raised - stats.bills_paid} />
          </Row>
          <GroupListCard setLoading={(val) => {}} group={setGroupList} />
        </Main>
      </Container>
    </Fragment>
  );
};

export default StaffDashboardPage;
