import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import Wrapper from '../../../shared/Wrapper';
import Container from '../../../shared/Container';
import Main from '../../../shared/Main';
import Card from '../../../shared/Card';
import Row from '../../../shared/Row';
import Col from '../../../shared/Col';
import MerchantHeader from '../../../shared/headers/merchant/MerchantHeader';
import CashierWallet from '../../../branch/dashboard/CashierWallets';
import MerchantCashierInfoSidebar from './MerchantCashierInfoSidebar';
import MerchantCreateCashierPopup from './MerchantCreateCashierPopup';

function MerchantCashierInfoPage(props) {
  const [editCashierPopup, setEditCashierPopup] = useState(false);
  const { match } = props;
  const { id } = match.params;
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem(`${id}_info`)),
  );
  const selectedBranch = JSON.parse(localStorage.getItem('selectedBranch'));

  /* if (isLoading) {
   return <Loader fullPage />;
   } */

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cashier | MERCHANT | E-WALLET</title>
      </Helmet>
      <MerchantHeader
        page="info"
        middleTitle={cashierInfo.name}
        goto={`/merchant/branch/info/${selectedBranch._id}`}
      />
      <Container verticalMargin>
        <MerchantCashierInfoSidebar
          edit={() => {
            setEditCashierPopup(true);
          }}
          name={cashierInfo.name}
          active="info"
          type="Cashier"
        />
        <Main>
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
      {editCashierPopup ? (
        <MerchantCreateCashierPopup
          type="update"
          refreshCashierList={(data) => setCashierInfo(data)}
          onClose={() => setEditCashierPopup(false)}
          cashier={cashierInfo}
        />
      ) : null}
    </Wrapper>
  );
}

export default MerchantCashierInfoPage;
