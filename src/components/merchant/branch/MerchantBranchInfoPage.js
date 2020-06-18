import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import MerchantBranchInfoSidebar from './MerchantBranchInfoSidebar';
import CreateBranchPopup from './CreateBranchPopup';
import { blockMerchantBranch, unblockMerchantBranch } from '../api/MerchantAPI';

function MerchantBranchInfoPage(props) {
  const [branchInfo, setBranchInfo] = useState({});
  const [editBranchPopup, setEditBranchPopup] = useState(false);
  const { match } = props;
  const { id } = match.params;
  useEffect(() => {
    const branch = JSON.parse(localStorage.getItem(`${id}_branchInfo`));
    setBranchInfo(branch);
  }, []);

  const handleBranchEdit = () => {
    setEditBranchPopup(true);
  };
  const onPopupClose = () => {
    setEditBranchPopup(false);
  };
  const refreshBranchInfo = (data) => {
    setBranchInfo(data);
    localStorage.setItem(`${id}_branchInfo`, JSON.stringify(data));
  };

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Branch | MERCHANT | E-WALLET</title>
      </Helmet>
      <MerchantHeader page="info" middleTitle={id} goto="/merchant/branches" />
      <Container verticalMargin>
        <MerchantBranchInfoSidebar
          edit={() => handleBranchEdit()}
          name={branchInfo.name}
          active="info"
          blockStatus={branchInfo.status}
          block={() =>
            blockMerchantBranch(branchInfo._id).then(() => {
              setBranchInfo({ ...branchInfo, status: 2 });
            })
          }
          unblock={() =>
            unblockMerchantBranch(branchInfo._id).then(() => {
              setBranchInfo({ ...branchInfo, status: 0 });
            })
          }
        />
        <Main>
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
      {editBranchPopup ? (
        <CreateBranchPopup
          type="update"
          branch={branchInfo}
          refreshBranchList={(data) => refreshBranchInfo(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
}

export default MerchantBranchInfoPage;
