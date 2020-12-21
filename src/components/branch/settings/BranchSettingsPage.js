import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Button from '../../shared/Button';
import ActionBar from '../../shared/ActionBar';
import EditBranchPopup from './EditBranchPopup';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import BranchSettingsSidebar from './BranchSettingsSidebar';

function BranchSettingsPage(props) {
  const [branchInfo, setBranchInfo] = useState(
    JSON.parse(localStorage.getItem('branchLogged')).details,
  );
  const [editBranchPopup, setEditBranchPopup] = useState(false);
  /* if (isLoading) {
    return <Loader fullPage />;
  } */

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings | BRANCH | E-WALLET</title>
      </Helmet>
      <BranchHeader page="info" goto="/branch/dashboard" />
      <Container verticalMargin>
        <BranchSettingsSidebar active="info" />

        <Main>
          <ActionBar
            marginBottom="33px"
            // inputWidth="calc(100% - 241px)"
            // className="clr"
            style={{
              // display: 'flex',
              // flexDirection: 'row',
              // justifyContent: 'flex-end',
              backgroundColor: ""
            }}
          >

            <h2 style={{ margintop: "" }}>{branchInfo.name}</h2>

            <Button
              className="addBankButton"
              style={{ padding: '2px' }}
              onClick={() => setEditBranchPopup(true)}
              flex
            >
              <span>Edit</span>
            </Button>
          </ActionBar>
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Branch Name</Col>
                <Col className="infoRight">{branchInfo.name}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Branch Code</Col>
                <Col className="infoRight">{branchInfo.code}</Col>
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
      {
        editBranchPopup ? (
          <EditBranchPopup
            type="update"
            branch={branchInfo}
            refreshBranchList={(data) => {
              setBranchInfo(data);
              localStorage.setItem(
                'branchLogged',
                JSON.stringify({ details: data }),
              );
              window.location.reload();
            }}
            onClose={() => setEditBranchPopup(false)}
          />
        ) : null
      }
    </Wrapper >
  );
}

export default BranchSettingsPage;
