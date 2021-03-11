import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Table from '../../shared/Table';
import Col from '../../shared/Col';
import Main from '../../shared/Main';
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Footer from '../../Footer';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import OverDueInvoiceCard from '../../shared/OverDueInvoiceCard';
import BranchInvoiceNumberCard from '../../shared/BranchInvoiceNumberCard';
import BranchPaymentReceivedCard from '../../shared/BranchPaymentReceivedCard';
import BranchCashierList from './BranchCashierList';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import axios from 'axios';
import notify from '../../utils/Notify';
import { API_URL } from '../../constants';
import { CURRENCY } from '../../constants';
import Loader from '../../shared/Loader';
import AssignUserPopup from './AssignUserPopup';
import BranchEditCashierPopup from './BranchEditCashierPopup';
import {
  blockCashierApi,
  fetchBranchStaffList,
  getBranchCashier,
  checkCashierStats,
  checkStaffStats,
  getMerchantSettings,
} from '../api/BranchAPI';
import history from '../../utils/history';

const BranchDashboardPage = (props) => {
  const [stats, setStats] = useState({});
  const bankName = JSON.parse(localStorage.getItem('branchLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('branchLogged')).bank.logo;
  const { type } = props;
  const name = localStorage.getItem(`branch_name`);
  const [assignUserPopup, setAssignUserPopup] = React.useState(false);
  const [editCashierPopup, setEditCashierPopup] = React.useState(false);
  const [period, setperiod] = React.useState('');
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

  const getStats = () => {
    axios
    .post(`${API_URL}/merchantBranch/getDashStats`,{})
      .then(res => {
        if (res.status == 200) {
          if (res.data.status===0) {
            throw res.data.error;
          } else {
            setStats(res.data);
          }
        }
      })
      .then(res => {
        setTimeout(function() {
          getStats();
        }, 3000);
      })
      .catch(err => {
        setTimeout(function() {
          getStats();
        }, 5000);
      });
  }

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
    setLoading(true)
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

    setLoading(userlist.loading);
  };

  const getCashierInfoURL = (cashierId) => {
    return `/branch/cashier/info/${cashierId}`;
  };

  const getStaffReportURL = (cashierId) => {
    return `/branch/staff/report/${cashierId}`;
  };

  const getCashierReportURL = (cashierId) => {
    console.log('wff');
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
          <td>{cashierStats[index].opening_balance}</td>
          <td>{`${new Date(cashierStats[index].opening_time).getHours()}:${new Date(cashierStats[index].opening_time).getMinutes()}`}</td>
         
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
                <span
                  onClick={() => handleEditCashierPopupClick('update', cashier)}
                >
                  Allow Counter Invoice
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

  const refreshMerchantSettings = async () => {
    getMerchantSettings().then((data) => {
      setperiod(data.default_bill_period);
    });
  };



  useEffect(() => {
    refreshMerchantSettings();
    refreshCashierList();
    getStats();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Branch | {name.toUpperCase()} | Dashboard </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <BranchHeader active="dashboard" />
      <Container verticalMargin>
        <Main fullWidth>
              <div className="cardHeader" style={{display:'flex'}}>
                <div className="cardHeaderLeft" style={{display:'flex',alignItems:'center'}}>
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="cardHeaderRight" style={{marginLeft:"5px"}}>
                  <h3>Daily Activity</h3>
                </div>
              </div>
              <div className="cardHeader" style={{display:'flex'}}>
                <div className="cardHeaderRight" style={{marginLeft:"5px"}}>
                  <h3>Period : {period.period_name}</h3>
                </div>
              </div>
              
        <Row style={{marginTop:'20px',marginBottom:'10px'}}>
        <Col>
              <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Number of Cashier</h4>
                  <div className="cardValue">{stats.total_cashier}</div>
                </Card>
              </Col>
              <Col>
                <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Opening Balance</h4>

                  <div className="cardValue">{CURRENCY}: {stats.opening_balance}</div>
                </Card>
              </Col>
              <Col>
              <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Cash Received</h4>
                  <div className="cardValue">{CURRENCY}: {stats.amount_collected}</div>
                </Card>
              </Col>
              <Col>
                <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Cash in Hand</h4>

                  <div className="cardValue">{CURRENCY}: {stats.cash_in_hand}</div>
                </Card>
              </Col>
              <Col>
              <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Penalty Collected</h4>
                  <div className="cardValue">{CURRENCY}: {stats.penalty_collected}</div>
                </Card>
              </Col>
             
            </Row>
            <Row style={{marginTop:'10px',marginBottom:'10px'}}>
            <Col>
              <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>No. of Staff</h4>

                  <div className="cardValue">{stats.total_staff}</div>
                </Card>
              </Col>
              
              <Col>
              <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Invoice Raised</h4>
                  <div className="cardValue"> {stats.invoice_raised}</div>
                </Card>
              </Col>
             
              <Col>
              <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Invoice Paid</h4>
                  <div className="cardValue"> {stats.invoice_paid}</div>
                </Card>
              </Col>
              <Col>
              <Card
                  bigPadding
                  smallValue
                  style={{textAlign:'center'}}
                >
                  <h4>Invoice Pending</h4>
                  <div className="cardValue"> {stats.invoice_raised-stats.invoice_paid}</div>
                </Card>
              </Col>
            </Row> 
            
        <Card bigPadding>
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
                  style={{marginLeft:'10px'}}
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
                      <th>Opening Balance</th>
                      <th>Opening Time</th>
                      <th>Invoices Paid</th>
                      <th>Amount Collected</th>
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
                    <th>Invoices Pending</th>
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
      
       
        </Main>
        
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
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default BranchDashboardPage;
