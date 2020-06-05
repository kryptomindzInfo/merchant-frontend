import { Helmet } from 'react-helmet';
import React from 'react';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import CashierWallet from './CashierWallets';
import InfoSidebar from '../../shared/sidebars/InfoSidebar';
import BranchHeader from '../../shared/headers/branch/BranchHeader';

function CashierInfo(props) {
  const { type, match } = props;
  const { name, id } = match.params;
  /* if (isLoading) {
    return <Loader fullPage />;
  } */
  return (
    <Wrapper from="merchant">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Branch | Merchant | E-WALLET</title>
      </Helmet>
      <BranchHeader
        page="info"
        middleTitle={id}
        goto="/merchant/branch/cashiers"
      />
      <Container verticalMargin>
        <InfoSidebar active="info" bankName="Kotak" type="Cashier" />
        <Main>
          <CashierWallet />
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Cashier Name</Col>
                <Col className="infoRight">Yusuf Jk</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Cashier Code</Col>
                <Col className="infoRight">2322</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Working Hours</Col>
                <Col className="infoRight"></Col>
              </Row>

              <Row>
                <Col className="infoLeft">From</Col>
                <Col className="infoRight">12:00PM</Col>
              </Row>

              <Row>
                <Col className="infoLeft">To</Col>
                <Col className="infoRight">8:00PM</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Maximum per transaction amount</Col>
                <Col className="infoRight">1000</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Maximum daily transaction amount</Col>
                <Col className="infoRight">100</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Maximum daily transaction count</Col>
                <Col className="infoRight">200</Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default CashierInfo;
