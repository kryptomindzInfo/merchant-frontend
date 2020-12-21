import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import StaffHeader from '../../shared/headers/cashier/StaffHeader';
import CashierSettingsSidebar from './CashierSettingsSidebar';

function CashierSettingsPage(props) {
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).staff,
  );
  const [positionInfo, setPositionInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).position,
  );
  const role = JSON.parse(localStorage.getItem('cashierLogged')).position.type;
  useEffect(() => {
  }, []); 
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings | Staff Position | E-WALLET</title>
      </Helmet>
      <StaffHeader
        page="info"
        middleTitle={cashierInfo.name}
        goto={role === 'staff' ? '/staff/dashboard' : '/cashier/dashboard'}
      />
      <Container verticalMargin>
        <CashierSettingsSidebar active="info" type="Cashier"/>
        <Main style={{ marginTop: '50px' }}>
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
                <Col className="infoRight">{positionInfo.working_from}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">To</Col>
                <Col className="infoRight">{positionInfo.working_to}</Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default CashierSettingsPage;
