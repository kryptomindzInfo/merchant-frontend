import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import CashierWallet from '../../branch/dashboard/CashierWallets';
import StaffHeader from '../../shared/headers/cashier/StaffHeader';
import CashierSettingsSidebar from './CashierSettingsSidebar';

function CashierSettingsPage(props) {
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings | Staff Position | E-WALLET</title>
      </Helmet>
      <StaffHeader
        page="info"
        middleTitle={cashierInfo.name}
        goto="/staff/dashboard"
      />
      <Container verticalMargin>
        <CashierSettingsSidebar active="info" type="Cashier" />
        <Main style={{ marginTop: '50px' }}>
          <CashierWallet />
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Cashier Name</Col>
                <Col className="infoRight">{cashierInfo.name}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Working Hours</Col>
                <Col className="infoRight"></Col>
              </Row>

              <Row>
                <Col className="infoLeft">From</Col>
                <Col className="infoRight">{cashierInfo.working_from}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">To</Col>
                <Col className="infoRight">{cashierInfo.working_to}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Maximum per transaction amount</Col>
                <Col className="infoRight">{cashierInfo.per_trans_amt}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Maximum daily transaction amount</Col>
                <Col className="infoRight">{cashierInfo.max_trans_amt}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Maximum daily transaction count</Col>
                <Col className="infoRight">{cashierInfo.max_trans_count}</Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default CashierSettingsPage;
