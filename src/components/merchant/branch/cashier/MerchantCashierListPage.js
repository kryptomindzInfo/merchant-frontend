import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../../shared/Wrapper';
import Loader from '../../../shared/Loader';
import Container from '../../../shared/Container';
import ActionBar from '../../../shared/ActionBar';
import Table from '../../../shared/Table';
import Main from '../../../shared/Main';
import Card from '../../../shared/Card';
import { CURRENCY } from '../../../constants';
import Button from '../../../shared/Button';
import MerchantHeader from '../../../shared/headers/merchant/MerchantHeader';
import MerchantBranchInfoSidebar from '../MerchantBranchInfoSidebar';
import MerchantCreateCashierPopup from './MerchantCreateCashierPopup';
import { getMerchantCashier } from '../../api/MerchantAPI';

function MerchantCashierListPage(props) {
  const [editCashierPopup, setEditCashierPopup] = React.useState(false);
  const [cashierPopupType, setCashierPopupType] = React.useState('new');
  const [cashierList, setCashierList] = React.useState([]);
  const [editingUser, setEditingUser] = React.useState({});
  const [editingCashier, setEditingCashier] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const { id } = props.match.params;
  const { name } = JSON.parse(localStorage.getItem('selectedBranch'));
  const selectedZone = localStorage.getItem('selectedZone');

  const handleEditCashierPopupClick = (type, cashier) => {
    setCashierPopupType(type);
    setEditingCashier(cashier);
    setEditCashierPopup(true);
  };

  const onEditingPopupClose = () => {
    setEditCashierPopup(false);
  };

  const refreshCashierList = async () => {
    setLoading(true);
    const data = await getMerchantCashier(id);
    setCashierList(data.list);
    setLoading(data.loading);
  };

  useEffect(() => {
    refreshCashierList();
  }, []); // Or [] if effect doesn't need props or state

  const getCashierInfoURL = (cashierId) => {
    return `/merchant/cashier/info/${cashierId}`;
  };

  function mappedCards() {
    return cashierList.map((cashier) => {
      return (
        <tr key={cashier._id}>
          <td>{cashier.name}</td>
          <td
            style={{
              color: cashier.is_closed ? 'red' : 'green',
            }}
          >
            {cashier.status === 1 ? 'Opened' : 'Closed'}
          </td>
          <td className="tac bold green">
            {cashier.max_trans_count}
            <span className="absoluteMiddleRight primary popMenuTrigger">
              <i className="material-icons ">more_vert</i>
              <div className="popMenu">
                <span
                  onClick={() => {
                    localStorage.setItem(
                      `${cashier._id}_info`,
                      JSON.stringify(cashier),
                    );
                    props.history.push(getCashierInfoURL(cashier._id));
                  }}
                >
                  Info
                </span>
                <span
                  onClick={() => handleEditCashierPopupClick('update', cashier)}
                >
                  Edit
                </span>
              </div>
            </span>
          </td>
        </tr>
      );
    });
  }

  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Staff | MERCHANT | E-WALLET </title>
      </Helmet>
      <MerchantHeader
        page="info"
        middleTitle={name}
        goto={`/merchant/${selectedZone}/branches`}
      />
      <Container verticalMargin>
        <MerchantBranchInfoSidebar active="cashier" />
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
              <input type="text" placeholder="Search Cashiers" />
            </div>
            <Button
              className="addBankButton"
              flex
              onClick={() => handleEditCashierPopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add Staff</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>Staff List</h3>
                <h5>List of your staff</h5>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Transaction Count</th>
                  </tr>
                </thead>
                <tbody>
                  {cashierList && cashierList.length > 0 ? mappedCards() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>

      {editCashierPopup ? (
        <MerchantCreateCashierPopup
          type={cashierPopupType}
          onClose={() => onEditingPopupClose()}
          refreshCashierList={(data) => refreshCashierList()}
          cashier={editingCashier}
          branchId={id}
        />
      ) : null}
    </Wrapper>
  );
}

export default MerchantCashierListPage;
