import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Main from '../../shared/Main';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import Card from '../../shared/Card';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';
import BranchInvoiceNumberCard from '../../shared/BranchInvoiceNumberCard';
import BranchPaymentReceivedCard from '../../shared/BranchPaymentReceivedCard';
import BranchCashierList from './BranchCashierList';
import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';
import { CURRENCY } from '../../constants';
import Loader from '../../shared/Loader';

const BranchDashboardPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const { type } = props;
  const name = localStorage.getItem(`branch_name`);

  const getStats = () => {
    axios
    .post(`${API_URL}/merchantBranch/getDashStats`,{})
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
        }, 5000);
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
        <Row>
              <Col>
                <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Opening Balance</h4>

                  <div className="cardValue">{CURRENCY}: {stats.opening_balance}</div>
                </Card>
              </Col>
              <Col>
              <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Cash Received</h4>
                  <div className="cardValue">{CURRENCY}: {stats.amount_collected}</div>
                </Card>
              </Col>
              <Col>
              <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>No. of Staff</h4>

                  <div className="cardValue">{stats.total_staff}</div>
                </Card>
              </Col>
              <Col>
                <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Cash in Hand</h4>

                  <div className="cardValue">{CURRENCY}: {stats.cash_in_hand}</div>
                </Card>
              </Col>
              <Col>
              <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Number of Cashier</h4>
                  <div className="cardValue">{stats.total_cashier}</div>
                </Card>
              </Col>
            </Row>
            <Row style={{marginTop:'5px',marginBottom:'35px'}}>
              <Col cw="20%">
              <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Penalty Collected</h4>
                  <div className="cardValue">{CURRENCY}: {stats.penalty_collected}</div>
                </Card>
              </Col>
              <Col cw="20%">
              <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>No. of invoice created</h4>
                  <div className="cardValue"> {stats.invoice_raised}</div>
                </Card>
              </Col>
              <Col cw="20%">
              <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Total Revenue</h4>
                  <div className="cardValue">{CURRENCY}: {stats.penalty_collected +stats.amount_collected}</div>
                </Card>
              </Col>
              <Col cw="40%"></Col>
            </Row>
            
          <BranchCashierList type={type} />
        </Main>
      </Container>
    </Fragment>
  );
};

export default BranchDashboardPage;
