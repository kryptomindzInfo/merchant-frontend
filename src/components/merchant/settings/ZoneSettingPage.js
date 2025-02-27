import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Loader from '../../shared/Loader';
import SettingSideBar from './SettingSidebar';
import { getZoneDetails } from '../api/MerchantAPI';
import ZoneSettingPopup from './ZoneSettingPopup';

const ZoneSettingPage = (props) => {
  const id = JSON.parse(localStorage.getItem('merchantLogged')).details._id;
  const admin = JSON.parse(localStorage.getItem('merchantLogged')).admin;
  const [addZoneSettingPopup, setAddZoneSettingPopup] = React.useState(false);
  const [
    addBillNumberSettingPopup,
    setAddBillNumberSettingPopup,
  ] = React.useState(false);
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleZoneSettingPopupClick = () => {
    setAddZoneSettingPopup(true);
  };

  const onZonePopupClose = () => {
    setAddZoneSettingPopup(false);
  };

  const refreshZoneDetails = async () => {
    setLoading(true);
    getZoneDetails(id).then((data) => {
      console.log(data);
      setZoneName(data.zone_name);
      setSubzoneName(data.subzone_name);
      setLoading(data.loading);
    });
  };

  useEffect(() => {
    refreshZoneDetails();
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | CustomSettings </title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
      <Container verticalMargin>
        <SettingSideBar active="ZoneSettings" />
        <Main big>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>{props.ruleType} Zone Setting</h3>
              </div>
            </div>
            <div className="cardBody">
              <Row>
                <Col cw="80%">
                  <Row>
                    <Col cw="50%">
                      <h2>Zone Name:</h2>
                    </Col>
                    <Col cw="50%">
                      <h2>{zoneName}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col cw="50%">
                      <h2>Subzone Name:</h2>
                    </Col>
                    <Col cw="50%">
                      <h2>{subzoneName}</h2>
                    </Col>
                  </Row>
                </Col>
                <Col cw="20%">
                  <Button
                    style={{ padding: '5px' }}
                    type="submit"
                    onClick={() => handleZoneSettingPopupClick()}
                    style={{display: admin ? "none" : ''}}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
      {addZoneSettingPopup ? (
        <ZoneSettingPopup
          refreszonedetails={(data) => refreshZoneDetails(data)}
          onClose={() => onZonePopupClose()}
          zonename={zoneName}
          subzonename={subzoneName}
        />
      ) : null}
    </Wrapper>
  );
};

export default ZoneSettingPage;
