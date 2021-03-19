import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import ActionBar from '../../shared/ActionBar';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import EditMerchantPopup from './EditMerchantPopup';
import Loader from '../../shared/Loader';
import SettingSideBar from './SettingSidebar';

const MerchantSettingsPage = (props) => {
  const [editMerchantPopup, setEditMerchantPopup] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [merchantInfo, setMerchantInfo] = useState({});
  const admin = JSON.parse(localStorage.getItem('merchantLogged')).admin;
  useEffect(() => {
    setLoading(true);
    if(admin){
      setMerchantInfo(JSON.parse(localStorage.getItem('merchantLogged')).adminuser);
    }else{
      setMerchantInfo(JSON.parse(localStorage.getItem('merchantLogged')).details);
    }
    setLoading(false);
  }, []);
  const handlePopupClick = () => {
    setEditMerchantPopup(true);
  };
  const onPopupClose = () => {
    setEditMerchantPopup(false);
  };
  const refreshMerchantInfo = (data) => {
    setLoading(true);
    setMerchantInfo(data);
    const merchantLogged = JSON.parse(localStorage.getItem('merchantLogged'));
    merchantLogged.details = data;
    localStorage.setItem('merchantLogged', JSON.stringify(merchantLogged));
    setLoading(false);
  };
  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Settings</title>
      </Helmet>
      <MerchantHeader />
      <Container verticalMargin>
        <SettingSideBar active="info" />
        <Main>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              className="addBankButton"
              style={{ padding: '8px' }}
              onClick={() => handlePopupClick()}
              flex
            >
              <span>Edit</span>
            </Button>
          </ActionBar>
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Name</Col>
                <Col className="infoRight">{merchantInfo.name}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Code</Col>
                <Col className="infoRight">{merchantInfo.username}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Email</Col>
                <Col className="infoRight">{merchantInfo.email}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Phone Number</Col>
                <Col className="infoRight">{merchantInfo.mobile}</Col>
              </Row>

              <Row>
                <Col className="infoLeft">Description</Col>
                <Col className="infoRight">{merchantInfo.description}</Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
      {editMerchantPopup ? (
        <EditMerchantPopup
          refreshMerchantList={(data) => refreshMerchantInfo(data)}
          merchant={merchantInfo}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};
export default MerchantSettingsPage;
