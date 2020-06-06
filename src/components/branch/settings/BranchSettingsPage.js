import { Helmet } from 'react-helmet';
import React from 'react';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import ProfileSidebar from '../../shared/sidebars/ProfileSidebar';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';

function BranchSettingsPage(props) {
  /* if (isLoading) {
    return <Loader fullPage />;
  } */
  const name = localStorage.getItem(`branch_name`);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Branch | {name.toUpperCase()} | Settings</title>
      </Helmet>
      <MerchantHeader page="info" goto="/branch/dashboard" />
      <Container verticalMargin>
        <ProfileSidebar active="info" bankName="Kotak" />
        <Main>
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Branch Name</Col>
                <Col className="infoRight">Lavelle Road</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Branch Code</Col>
                <Col className="infoRight">bcoe1</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Branch User ID</Col>
                <Col className="infoRight">yusufjk</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Address</Col>
                <Col className="infoRight">sdsjjsd</Col>
              </Row>

              <Row>
                <Col className="infoLeft">State</Col>
                <Col className="infoRight">Kar</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Zip Code</Col>
                <Col className="infoRight">2322</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Country Code</Col>
                <Col className="infoRight">+91</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Country</Col>
                <Col className="infoRight">India</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Email</Col>
                <Col className="infoRight">nnoreply54@gmail.com</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Phone Number</Col>
                <Col className="infoRight">8147218480</Col>
              </Row>
              <Row>
                <Col className="infoLeft">Branch Users</Col>
                <Col className="infoRight">Yusuf Jk</Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default BranchSettingsPage;
