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
import CreateBillTermPopup from './CreateBillTermPopup';
import DefaultBillTermPopup from './DefaultTermPopup';
import { getBillTerms } from '../api/MerchantAPI';

const BillTermSettingPage = (props) => {
  const [addBillTermPopup, setAddBillTermPopup] = React.useState(false);
  const [billTermList, setBillTermList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingBillTerm, setEditingBillTerm] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [defaultBillTerm, setDefaultBillTerm] = React.useState({});
  const [defaultBillTermPopup, setDefaultBillTermPopup] = React.useState(false);

  const handleBillTermPopupClick = (type, billterm) => {
    setEditingBillTerm(billterm);
    setPopupType(type);
    setAddBillTermPopup(true);
  };

  const onPopupClose = () => {
    setAddBillTermPopup(false);
  };

  const handleDefaultBillTermPopupClick = () => {
    setDefaultBillTermPopup(true);
  };

  const onDefaultBillTermPopupClose = () => {
    setDefaultBillTermPopup(false);
  };

  const refreshBillTermList = async () => {
    setLoading(true);
    getBillTerms().then((data) => {
      console.log(data);
      setBillTermList(data.list);
      setDefaultBillTerm(data.default_bill_term);
      setLoading(data.loading);
    });
  };

  const getBillTermList = () => {
    return billTermList.map((billterm) => {
      return (
        <tr key={billterm._id}>
          <td className="tac">{billterm.name}</td>
          <td className="tac">{billterm.days}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    refreshBillTermList();
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Bill Term Setting</title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
      <Container verticalMargin>
        <SettingSideBar active="BillTermSettings" />
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
              <input type="text" placeholder="Search Bill Terms" />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleBillTermPopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add Bill Term</span>
            </Button>
          </ActionBar>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div>
              {defaultBillTerm ? (
                <h3 style={{ margin: '6px' }}>
                  Default Bill Term : {defaultBillTerm.name}
                </h3>
              ) : (
                <h3 style={{ margin: '6px' }}>Please set default bill term</h3>
              )}
            </div>
            <Button
              className="addBankButton"
              style={{ float: 'right' }}
              onClick={() => handleDefaultBillTermPopupClick()}
            >
              <span>Set Default Term</span>
            </Button>
          </ActionBar>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Bill terms</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Days</th>
                  </tr>
                </thead>
                <tbody>
                  {billTermList && billTermList.length > 0
                    ? getBillTermList()
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addBillTermPopup ? (
        <CreateBillTermPopup
          type={popupType}
          billterm={editingBillTerm}
          refreshbilltermlist={(data) => refreshBillTermList(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
      {defaultBillTermPopup ? (
        <DefaultBillTermPopup
          billterm={defaultBillTerm}
          termlist={billTermList}
          onClose={() => onDefaultBillTermPopupClose()}
          refreshbilltermlist={(data) => refreshBillTermList(data)}
        />
      ) : null}
    </Wrapper>
  );
};
export default BillTermSettingPage;
