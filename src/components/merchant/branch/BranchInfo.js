import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import InfoSidebar from '../../shared/sidebars/InfoSidebar';

function BranchInfo(props) {
  const [branchInfo, setBranchInfo] = useState({});
  const { match } = props;
  useEffect(() => {
    const { id } = match.params;
    const branch = JSON.parse(localStorage.getItem(`${id}_branchInfo`));
    setBranchInfo(branch);
  }, []);
  return (
    <Wrapper from="merchant">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Branch | Merchant | E-WALLET</title>
      </Helmet>
      <MerchantHeader
        page="info"
        middleTitle="Branch Profile"
        goto="/merchant/branches"
      />
      <Container verticalMargin>
        <InfoSidebar active="info" />
        <Main>
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Branch Name</Col>
                <Col className="infoRight">{branchInfo.name}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Branch Code</Col>
                <Col className="infoRight">{branchInfo.branch_id}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Branch User ID</Col>
                <Col className="infoRight">{branchInfo.username}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Address</Col>
                <Col className="infoRight">{branchInfo.address1}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">State</Col>
                <Col className="infoRight">{branchInfo.state}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Zip Code</Col>
                <Col className="infoRight">{branchInfo.zip}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Country Code</Col>
                <Col className="infoRight">{branchInfo.ccode}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Country</Col>
                <Col className="infoRight">{branchInfo.country}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Email</Col>
                <Col className="infoRight">{branchInfo.email}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Phone Number</Col>
                <Col className="infoRight">{branchInfo.mobile}</Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default BranchInfo;
