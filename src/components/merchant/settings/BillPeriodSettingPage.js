import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { date } from 'yup';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../shared/Wrapper';
import ActionBar from '../../shared/ActionBar';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import SettingSideBar from './SettingSidebar';
import Table from '../../shared/Table';
import CreateBillPeriodPopup from './CreateBillPeriodPopup';
import DefaultBillPeriodPopup from './DefaultPeriodPopup';
import { getBillPeriods } from '../api/MerchantAPI';

const BillPeriodSettingPage = (props) => {
  const [addBillPeriodPopup, setAddBillPeriodPopup] = React.useState(false);
  const [billPeriodList, setBillPeriodList] = React.useState([]);
  const [copyBillPeriodList, setCopyBillPeriodList] = React.useState([])
  const [popupType, setPopupType] = React.useState('new');
  const [nextPeriodStartDate, setNextPeriodStartDate] = React.useState(null);
  const [defaultBillPeriod, setDefaultBillPeriod] = React.useState({});
  const [editingBillPeriod, setEditingBillPeriod] = React.useState({});
  const [defaultBillPeriodPopup, setDefaultBillPeriodPopup] = React.useState(
    false,
  );
  const [isLoading, setLoading] = React.useState(false);

  const handleBillPeriodPopupClick = (type, billterm) => {
    setEditingBillPeriod(billterm);
    setPopupType(type);
    setAddBillPeriodPopup(true);
  };

  const handleDefaultBillPeriodPopupClick = () => {
    setDefaultBillPeriodPopup(true);
  };

  const onDefaultBillPeriodPopupClose = () => {
    setDefaultBillPeriodPopup(false);
  };

  const onPopupClose = () => {
    setAddBillPeriodPopup(false);
  };

  const refreshBillPeriodList = async () => {
    setLoading(true);
    getBillPeriods().then((data) => {
      console.log(data);
      if (data.list.length > 0) {
        const startdate = new Date(data.list[data.list.length - 1].end_date);
        startdate.setDate(startdate.getDate() + 1);
        const nextStartDate = `${startdate.getDate()}/${startdate.getMonth() + 1
          }/${startdate.getFullYear()}`;
        setNextPeriodStartDate(nextStartDate);
      }
      setBillPeriodList(data.list);
      setCopyBillPeriodList(data.list)
      setDefaultBillPeriod(data.default_bill_period);
      setLoading(data.loading);
    });
  };

  const getBillPeriodList = () => {
    return billPeriodList.map((billperiod) => {
      const start = new Date(billperiod.start_date);
      const end = new Date(billperiod.end_date);
      return (
        <tr key={billperiod._id}>
          <td className="tac">{billperiod.period_name}</td>
          <td className="tac">
            {start.getDate()}-{start.getMonth() + 1}-{start.getFullYear()}
          </td>
          <td className="tac">
            {end.getDate()}-{end.getMonth() + 1}-{end.getFullYear()}
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    refreshBillPeriodList();
  }, []);

  const searchlistfunction = (value) => {
    console.log(value)
    console.log(copyBillPeriodList)


    const newfilterdata = copyBillPeriodList.filter(element =>
      element.period_name.toLowerCase().includes(value.toLowerCase()),
    );


    setBillPeriodList(newfilterdata)


  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Period Setting</title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
      <Container verticalMargin>
        <SettingSideBar active="BillPeriodSettings" />
        <Main big>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Bill Periods" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleBillPeriodPopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add Period</span>
            </Button>
          </ActionBar>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div>
              {defaultBillPeriod ? (
                <h3 style={{ margin: '6px' }}>
                  Default Period : {defaultBillPeriod.period_name}
                </h3>
              ) : (
                  <h3 style={{ margin: '6px' }}>Please set default period</h3>
                )}
            </div>
            <Button
              className="addBankButton"
              style={{ float: 'right' }}
              onClick={() => handleDefaultBillPeriodPopupClick()}
            >
              <span>Set Default Period</span>
            </Button>
          </ActionBar>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Periods</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End date</th>
                  </tr>
                </thead>
                <tbody>
                  {billPeriodList && billPeriodList.length > 0
                    ? getBillPeriodList()
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addBillPeriodPopup ? (
        <CreateBillPeriodPopup
          type={popupType}
          billperiod={editingBillPeriod}
          refreshbillperiodlist={(data) => refreshBillPeriodList(data)}
          startdate={nextPeriodStartDate}
          onClose={() => onPopupClose()}
        />
      ) : null}
      {defaultBillPeriodPopup ? (
        <DefaultBillPeriodPopup
          billperiod={defaultBillPeriod}
          periodlist={billPeriodList}
          refreshbillperiodlist={(data) => refreshBillPeriodList(data)}
          onClose={() => onDefaultBillPeriodPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};
export default BillPeriodSettingPage;
