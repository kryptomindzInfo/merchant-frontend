import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Wrapper from '../../shared/Wrapper';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import Loader from '../../shared/Loader';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';
import A from '../../shared/A';
import AssignUserPopup from './AssignUserPopup';
import EditCashierPopup from './EditCashierPopup';

function CashierList(props) {
  const { match } = props;
  const { branchName } = match.params;
  const [assignUserPopup, setAssignUserPopup] = React.useState(false);
  const [editCashierPopup, setEditCashierPopup] = React.useState(false);
  const [cashierList, setCashierList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [editingUser, setEditingUser] = React.useState({});
  const [editingCashier, setEditingCashier] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);

  const handleAssignUserPopupClick = (user) => {
    setEditingUser(user);
    setAssignUserPopup(true);
  };

  const onAssignUserPopupClose = () => {
    setAssignUserPopup(false);
  };

  const handleEditCashierPopupClick = (cashier) => {
    setEditingCashier(cashier);
    setEditCashierPopup(true)
  };

  const onEditingPopupClose = () => {
    setEditCashierPopup(false);
  };

  useEffect(() => {
    const getCashierList = () => {
      const users = [
        {
          name: 'Yusuf Jk',
          isAdmin: false,
          _id: 'sdsdsd',
          logo: '2323232.png',
        },
        {
          name: 'Demo',
          isAdmin: true,
          _id: 'sdsdsdds',
          logo: '2323232.png',
        },
      ];
      const cashiers = [
        {
          is_closed: 'false',
          _id: 'sdsdsd',
          name: 'Yusuf',
          opening_balance: 100,
          cash_received: 1000,
          cash_paid: 200,
          bank_user_id: 'sdsdsd',
          total_trans: 1000,
        },
      ];
      setCashierList(cashiers);
      setUserList(users);
    };
    getCashierList();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper from="merchant">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ `${branchName} | Cashiers` }</title>
      </Helmet>
      <BranchHeader active="cashier" branchName={branchName} />
      <Container verticalMargin>
        <Main fullWidth>
          <ActionBar
            marginBottom="33px"
            inputWidth="100%"
            className="clr"
          >
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
                <h3>Cashier List</h3>
                <h5>List of your cashier</h5>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Cashier Name</th>
                    <th>Cash in Hand</th>
                    <th>Assigned to</th>
                    <th>Status</th>
                    <th>Transaction Count</th>
                  </tr>
                </thead>
                <tbody>
                  {cashierList && cashierList.length > 0 && userList
                    ? cashierList.map((cashier) => {
                      return (
                        <tr key={cashier._id}>
                          <td>{cashier.name}</td>
                          <td className="tac">
                            {CURRENCY}{' '}
                            {(
                              cashier.opening_balance +
                                (cashier.cash_received - cashier.cash_paid)
                            ).toFixed(2)}
                          </td>
                          <td>
                            {userList.filter(
                              (u) => u._id === cashier.bank_user_id,
                            )[0]
                              ? userList.filter(
                                (u) => u._id === cashier.bank_user_id,
                              )[0].name
                              : ''}
                          </td>
                          <td
                            style={{
                              color: cashier.is_closed ? 'red' : 'green',
                            }}
                          >
                            {cashier.is_closed ? 'Closed' : 'Opened'}
                          </td>
                          <td className="tac bold green">
                            {cashier.total_trans}
                            <span className="absoluteMiddleRight primary popMenuTrigger">
                              <i className="material-icons ">more_vert</i>
                              <div className="popMenu">
                                <A href="/branch/cashier/info/dsd">Cashier Info</A>
                                <span onClick={() => handleEditCashierPopupClick({})}>Edit</span>
                                <span onClick={() => handleAssignUserPopupClick({})} >Assign User</span>
                                {cashier.is_closed ? (
                                  <span>Re-open Access</span>
                                ) : null}

                                {cashier.status === -1 ? (
                                  <span>Unblock</span>
                                ) : (
                                  <span>Block</span>
                                )}
                              </div>
                            </span>
                          </td>
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {assignUserPopup ? <AssignUserPopup onClose={() => onAssignUserPopupClose()} user={userList} /> : null}

      {editCashierPopup ? <EditCashierPopup onClose={() => onEditingPopupClose()} cashier={cashierList} /> : null}
    </Wrapper>
  );
}

export default CashierList;
