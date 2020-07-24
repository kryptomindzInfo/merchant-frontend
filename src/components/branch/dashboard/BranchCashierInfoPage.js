import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import CashierWallet from './CashierWallets';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import BranchCashierInfoSidebar from './BranchCashierInfoSidebar';
import BranchEditCashierPopup from './BranchEditCashierPopup';

function BranchCashierInfoPage(props) {
  const [editCashierPopup, setEditCashierPopup] = useState(false);
  const { match } = props;
  const { id } = match.params;
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('selectedCashier')),
  );
  /* if (isLoading) {
    return <Loader fullPage />;
  } */

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Position | BRANCH | E-WALLET</title>
      </Helmet>
      <BranchHeader
        page="info"
        middleTitle={cashierInfo.name}
        goto="/branch/dashboard"
      />
      <Container verticalMargin>
        <BranchCashierInfoSidebar
          edit={() => {
            setEditCashierPopup(true);
          }}
          active="info"
          id={id}
          type="Cashier"
        />
        <Main>
          <CashierWallet />
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Staff Name</Col>
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
            </div>
          </Card>
        </Main>
      </Container>
      {editCashierPopup ? (
        <BranchEditCashierPopup
          type="update"
          refreshCashierList={(data) => setCashierInfo(data)}
          onClose={() => setEditCashierPopup(false)}
          cashier={cashierInfo}
        />
      ) : null}
    </Wrapper>
  );
}

export default BranchCashierInfoPage;
