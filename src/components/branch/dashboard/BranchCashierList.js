import React, { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Wrapper from '../../shared/Wrapper';
import Loader from '../../shared/Loader';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import AssignUserPopup from './AssignUserPopup';
import BranchEditCashierPopup from './BranchEditCashierPopup';
import {
  blockCashierApi,
  fetchBranchStaffList,
  getBranchCashier,
} from '../api/BranchAPI';
import history from '../../utils/history';

function BranchCashierList(props) {
  const name = localStorage.getItem(`branch_name`);
  const [assignUserPopup, setAssignUserPopup] = React.useState(false);
  const [editCashierPopup, setEditCashierPopup] = React.useState(false);
  const [cashierPopupType, setCashierPopupType] = React.useState('new');
  const [cashierList, setCashierList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [editingUser, setEditingUser] = React.useState({});
  const [editingCashier, setEditingCashier] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);

  const handleAssignUserPopupClick = (cashier) => {
    setEditingCashier(cashier);
    setAssignUserPopup(true);
  };

  const onAssignUserPopupClose = () => {
    setAssignUserPopup(false);
  };

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
    getBranchCashier().then((data) => {
      setCashierList(data.list);
    });
    fetchBranchStaffList().then((data) => {
      setUserList(data.list);
    });
    setLoading(false);
  };
  useEffect(() => {
    refreshCashierList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const getCashierInfoURL = (cashierId) => {
    return `/branch/cashier/info/${cashierId}`;
  };
  function mappedCards() {
    return cashierList.map((cashier) => {
      return (
        <tr key={cashier._id}>
          <td>{cashier.name}</td>
          <td>
            {userList.filter((u) => u._id === cashier.staff_id)[0]
              ? userList.filter((u) => u._id === cashier.staff_id)[0].name
              : ''}
          </td>
          <td
            style={{
              color: cashier.status === 2 ? 'red' : 'green',
            }}
          >
            {cashier.status === 2 ? 'Closed' : 'Opened'}
          </td>
          <td className="tac bold green">
            {cashier.max_trans_count}
            <span className="absoluteMiddleRight primary popMenuTrigger">
              <i className="material-icons ">more_vert</i>
              <div className="popMenu">
                <span
                  onClick={() => {
                    localStorage.setItem(
                      'selectedCashier',
                      JSON.stringify(cashier),
                    );
                    history.push(getCashierInfoURL(cashier._id));
                  }}
                >
                  Staff Info
                </span>
                <span
                  onClick={() => handleEditCashierPopupClick('update', cashier)}
                >
                  Edit
                </span>
                <span onClick={() => handleAssignUserPopupClick(cashier)}>
                  Assign User
                </span>

                {cashier.status === 0 ? (
                  <span
                    onClick={() =>
                      blockCashierApi('unblock', cashier._id).then(() =>
                        refreshCashierList(),
                      )
                    }
                  >
                    Unblock
                  </span>
                ) : (
                  <span
                    onClick={() =>
                      blockCashierApi('block', cashier._id).then(() =>
                        refreshCashierList(),
                      )
                    }
                  >
                    Block
                  </span>
                )}
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
      <Container verticalMargin>
        <Main fullWidth>
          <ActionBar marginBottom="33px" inputWidth="100%" className="clr">
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Cashiers" />
            </div>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>Staff List</h3>
                <h5>List of your staffs</h5>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Assigned to</th>
                    <th>Status</th>
                    <th>Transaction Count</th>
                  </tr>
                </thead>
                <tbody>
                  {cashierList && cashierList.length > 0 && userList
                    ? mappedCards()
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {assignUserPopup ? (
        <AssignUserPopup
          onClose={() => onAssignUserPopupClose()}
          user={userList}
          cashier={editingCashier}
          refreshCashierList={() => refreshCashierList()}
        />
      ) : null}

      {editCashierPopup ? (
        <BranchEditCashierPopup
          type={cashierPopupType}
          onClose={() => onEditingPopupClose()}
          refreshCashierList={(data) => refreshCashierList()}
          cashier={editingCashier}
        />
      ) : null}
    </Wrapper>
  );
}

export default BranchCashierList;
