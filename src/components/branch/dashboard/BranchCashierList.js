import React, { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Wrapper from '../../shared/Wrapper';
import Loader from '../../shared/Loader';
import Button from '../../shared/Button';
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
  checkCashierStats,
  checkStaffStats,
} from '../api/BranchAPI';
import history from '../../utils/history';

function BranchCashierList(props) {
  const name = localStorage.getItem(`branch_name`);
  const [assignUserPopup, setAssignUserPopup] = React.useState(false);
  const [editCashierPopup, setEditCashierPopup] = React.useState(false);
  const [cashierPopupType, setCashierPopupType] = React.useState('new');
  const [staffList, setstaffList] = React.useState([]);
  const [cashierList, setCashierList] = React.useState([]);
  const [cashierStats, setCashierStats] = React.useState([]);
  const [staffStats, setStaffStats] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [editingUser, setEditingUser] = React.useState({});
  const [editingCashier, setEditingCashier] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [toggleButton, setToggleButton] = React.useState('cashier');

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

  const toggle = () => {
    if(toggleButton === 'cashier'){
      setToggleButton('staff');
    } else if(toggleButton === 'staff'){
      setToggleButton('cashier');
    }
  }

  const getCashierStats = async(list) => {
    const statlist = list.map(async (cashier,index) => {
        const data = await checkCashierStats(cashier._id);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  }

  const getStaffStats = async(list) => {
    const statlist = list.map(async (staff,index) => {
        const data = await checkStaffStats(staff._id);
        return (data);
    })
    const result = await Promise.all(statlist);
    return({res:result, loading:false});
  }

  const refreshCashierList = async () => {
    const positionlist = await getBranchCashier();
    console.log(positionlist);
    setCashierList(positionlist.cashiers);
    setstaffList(positionlist.staffs);
    const cashierstats = await getCashierStats(positionlist.cashiers);
    setCashierStats(cashierstats.res);
    const staffstats = await getStaffStats(positionlist.staffs);
    setStaffStats(staffstats.res);
    const userlist = await fetchBranchStaffList();
    setUserList(userlist.list);

    props.loading(userlist.loading);
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

  const getStaffReportURL = (cashierId) => {
    return `/branch/staff/report/${cashierId}`;
  };

  const getCashierReportURL = (cashierId) => {
    return `/branch/cashier/report/${cashierId}`;
  };

  function mappedCards() {
    return cashierList.map((cashier,index) => {
      const assignedTo = userList.filter((u) => u._id === cashier.staff_id)[0]
      ? userList.filter((u) => u._id === cashier.staff_id)[0].name
      : '';
      return (
        <tr key={cashier._id}>
          <td style={{display:"inline-flex"}}>
            <FiberManualRecordIcon  fontSize="small" color={cashier.status === 2 ? "secondary" : "primary"}/>
              {cashier.name}
          </td>
          <td>
            {assignedTo}
          </td>
          <td>{cashierStats[index].bills_paid}</td>
         
          <td>
            {cashierStats[index].amount_collected}
          </td>
          <td>
            {cashierStats[index].penalty_collected}
          </td>
          <td>
            {cashierStats[index].cash_in_hand}
          </td>
          <td className="tac bold green">
          <Button
            className="sendMoneyButton"
            onClick={() => {
              localStorage.setItem(
                'selectedCashier',
                JSON.stringify(cashier),
              );
              localStorage.setItem(
                'assignedTo',
                assignedTo,
              );
              history.push(getCashierReportURL(cashier._id));
            }}
          >                            
            Reports                      
        </Button>
            <span className="absoluteMiddleRight primary popMenuTrigger">
              <i className="material-icons ">more_vert</i>
              <div className="popMenu">
                {/* <span
                  onClick={() => {
                    localStorage.setItem(
                      'selectedCashier',
                      JSON.stringify(cashier),
                    );
                    history.push(getCashierInfoURL(cashier._id));
                  }}
                >
                  Info
                </span> */}
                {/* <span
                  onClick={() => handleEditCashierPopupClick('update', cashier)}
                >
                  Edit
                </span> */}
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

  function mappedCardsstaff() {
    return staffList.map((cashier,index) => {
      const assignedTo = userList.filter((u) => u._id === cashier.staff_id)[0]
      ? userList.filter((u) => u._id === cashier.staff_id)[0].name
      : '';
      return (
        <tr key={cashier._id}>
          <td style={{display:"inline-flex"}}>
            <FiberManualRecordIcon  fontSize="small" color={cashier.status === 2 ? "secondary" : "primary"}/>
              {cashier.name}
          </td>
          <td>
            {assignedTo}
          </td>
          <td>
            {staffStats[index].bills_raised}
          </td>
          <td>
            {staffStats[index].bills_paid}
          </td>
          <td>
            {staffStats[index].bills_raised-staffStats[index].bills_paid}
          </td>
          <td>
            {staffStats[index].counter_invoices}
          </td>
          <td className="tac bold green">
          <Button
            className="sendMoneyButton"
            onClick={() => {
              localStorage.setItem(
                'selectedCashier',
                JSON.stringify(cashier),
              );
              localStorage.setItem(
                'assignedTo',
                assignedTo,
              );
              history.push(getStaffReportURL(cashier._id));
            }}
          >                    
            Reports                   
        </Button>
            <span className="absoluteMiddleRight primary popMenuTrigger">
              <i className="material-icons ">more_vert</i>
              <div className="popMenu">
                {/* <span
                  onClick={() => {
                    localStorage.setItem(
                      'selectedCashier',
                      JSON.stringify(cashier),
                    );
                    localStorage.setItem(
                      'assignedTo',
                      assignedTo,
                    );
                    history.push(getCashierInfoURL(cashier._id));
                  }}
                >
                  Info
                </span> */}
                {/* <span
                  onClick={() => handleEditCashierPopupClick('update', cashier)}
                >
                  Edit
                </span> */}
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

  return (
    <Wrapper>

          <Card bigPadding>
          <div className="cardHeader">
                <div className="cardHeaderLeft">
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>Daily Activity</h3>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  marginTop: '10px',
                }}
              >
                <Button
                  className={toggleButton === 'cashier' ? 'active' : ''}
                  onClick={()=>toggle()}
                  marginRight="5px"
                  padding="5px"
                >
                  Cashier
                </Button>
                <Button
                  className={toggleButton === 'staff' ? 'active' : ''}
                  onClick={()=>toggle()}
                  marginLeft="30px"
                >
                  Staff
                </Button>
              </div>
            <div className="cardBody">
              {toggleButton === 'cashier'? (
                  <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                      <th>Cashier Name</th>
                      <th>Assigned to</th>
                      <th>Invoices Paid</th>
                      <th>AmountCollected</th>
                      <th>Penalty Collected</th>
                      <th>Cash in hand (XOF)</th>                   
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashierList && cashierList.length > 0 && userList
                      ? mappedCards()
                      : null}
                  </tbody>
                </Table>
              
              ): (
                <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Assigned to</th>
                    <th>Invoices Raised</th>
                    <th>Invoices Paid</th>
                    <th>Invoices Pendung</th>
                    <th>Counter Invoices</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {staffList && staffList.length > 0 && userList
                    ? mappedCardsstaff()
                    : null}
                </tbody>
              </Table>
            
              )}
              
            </div>
          </Card>
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
