import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../shared/Wrapper';
import CashierHeader from '../../shared/headers/cashier/CashierHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Loader from '../../shared/Loader';
import CashierSettingsSidebar from './CashierSettingsSidebar';
import { getCounter } from '../api/CashierAPI';
import CounterPopup from './CounterPopup';

const CashierBillSettingsPage = (props) => {
  const [addBillSettingPopup, setAddBillSettingPopup] = React.useState(false);
  const [currentBillNumber, setCurrentBillNumber] = React.useState('');
  const [merchantName, setMerchantName] = React.useState(
    JSON.parse(localStorage.getItem('cashierLogged')).merchant.username.slice(
      0,
      3,
    ),
  );
  const [branchName, setBranchName] = React.useState(
    JSON.parse(localStorage.getItem('cashierLogged')).branch.username.slice(
      0,
      3,
    ),
  );
  const [cashierName, setCashierName] = React.useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier.username.slice(
      0,
      3,
    ),
  );
  const [
    addBillNumberSettingPopup,
    setAddBillNumberSettingPopup,
  ] = React.useState(false);
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleBillPopupClick = () => {
    setAddBillSettingPopup(true);
  };

  const onBillPopupClose = () => {
    setAddBillSettingPopup(false);
  };

  const refreshCounter = async () => {
    setLoading(true);
    getCounter().then((data) => {
      const billnumber = `${merchantName}${branchName}${cashierName}${data.counter}`;
      setCurrentBillNumber(billnumber);
      setLoading(data.loading);
    });
  };

  useEffect(() => {
    refreshCounter();
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | CustomSettings </title>
      </Helmet>
      <CashierHeader page="info" goto="/cashier/dashboard" />
      <Container verticalMargin>
        <CashierSettingsSidebar active="billnumber" type="Cashier" />
        <Main big>
          <Card bigPadding topMargin="55px">
            <div className="cardBody">
              <Row>
                <Col cw="80%">
                  <Row>
                    <Col cw="50%">
                      <h2>Current Bill No:</h2>
                    </Col>
                    <Col cw="50%">
                      <h2>{currentBillNumber}</h2>
                    </Col>
                  </Row>
                </Col>
                <Col cw="20%">
                  <Button
                    style={{ padding: '5px' }}
                    type="submit"
                    onClick={() => handleBillPopupClick()}
                  >
                    Set Counter
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
      {addBillSettingPopup ? (
        <CounterPopup
          refresbillnumber={(data) => refreshCounter(data)}
          onClose={() => onBillPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};

export default CashierBillSettingsPage;
