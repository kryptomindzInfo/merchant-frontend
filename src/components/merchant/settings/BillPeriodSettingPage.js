import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
import { getBillPeriods } from '../api/MerchantAPI';

const BillPeriodSettingPage = (props) => {
  const [addBillPeriodPopup, setAddBillPeriodPopup] = React.useState(false);
  const [billPeriodList, setBillPeriodList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingBillPeriod, setEditingBillPeriod] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);

  const handleBillPeriodPopupClick = (type, billterm) => {
    setEditingBillPeriod(billterm);
    setPopupType(type);
    setAddBillPeriodPopup(true);
  };

  const onPopupClose = () => {
    setAddBillPeriodPopup(false);
  };

  const refreshBillPeriodList = async () => {
    setLoading(true);
    getBillPeriods().then((data) => {
      console.log(data);
      setBillPeriodList(data.list);
      setLoading(data.loading);
    });
  };

  const getBillPeriodList = () => {
    return billPeriodList.map((billperiod) => {
      const start = new Date(billperiod.start_date);
      const end = new Date(billperiod.end_date);
      return (
        <tr key={billperiod._id}>
          <td className="tac">
            {start.getFullYear()}-{start.getMonth() + 1}-{start.getDate()}
          </td>
          <td className="tac">
            {end.getFullYear()}-{end.getMonth() + 1}-{end.getDate()}
          </td>
          <td className="tac">{billperiod.period_name}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    refreshBillPeriodList();
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Bill Period Setting</title>
      </Helmet>
      <MerchantHeader
        page="info"
        middleTitle="Bill Period Setting"
        goto="/merchant/dashboard"
      />
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
              <input type="text" placeholder="Search Bill Periods" />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleBillPeriodPopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add Bill Period</span>
            </Button>
          </ActionBar>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Bill Periods</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End date</th>
                    <th>Period Name</th>
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
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};
export default BillPeriodSettingPage;
