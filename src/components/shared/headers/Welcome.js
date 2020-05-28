import React, { Component } from 'react';
import styled from 'styled-components';
import NotificationIcon from '@material-ui/icons/Notifications';
import history from '../../utils/history';
import SubNav from './SubNav';
import A from '../A';

const WelcomeWrap = styled.div`
  float: right;
  margin: 7px 0;
  display: flex;
  color: #fff;
  font-size: 18px;
  font-weight: normal;
  line-height: 26px;
`;

const Name = styled.div`
  float: left;
  margin-left: 10px;
  margin-right: 50px;
`;

const Icon = styled.i`
  float: left;
  margin-left: 10px;
`;

class Welcome extends Component {
  logoutInfra = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    history.push('/');
  };

  logoutBank = () => {
    localStorage.removeItem('merchantLogged');
    localStorage.removeItem('merchantName');
    history.push('/merchant/login');
  };

  logoutBranch = () => {
    localStorage.removeItem('branchLogged');
    localStorage.removeItem('branchName');
    history.push(`/branch/${this.props.bankName}`);
  };

  logoutCashier = () => {
    localStorage.removeItem('cashierLogged');
    history.push(`/cashier/${this.props.bankName}`);
    // this.props.history.push('/bank');
  };

  render() {
    let name = '';
    let isAdmin = false;
    if (this.props.from === 'merchant') {
      name = localStorage.getItem('merchantName');
    } else if (this.props.from === 'branch') {
      name = localStorage.getItem('branchName');
    } else if (this.props.from === 'cashier') {
      name = localStorage.getItem('cashierName');
    } else {
      isAdmin = localStorage.getItem('isAdmin');
      name = localStorage.getItem('name');
    }
    name = 'Airtel';
    const tempDate = new Date();
    const date = `${tempDate.getDate()}-${
      tempDate.getMonth() + 1
    }-${tempDate.getFullYear()} `;
    const currDate = `${date}`;

    const { bankName } = this.props;
    return (
      <>
        <WelcomeWrap className="clr">
          <Icon className="material-icons fl">
            <NotificationIcon />
          </Icon>
          <div className="dropdown fl">
            {this.props.infraNav ? (
              <>
                <Name>
                  <span>INFRA:</span> {name}
                </Name>
                <SubNav className="infraSubNav">
                  {/* { isAdmin ?  */}
                  <A href="/profile">Settings</A>
                  {/* //  : null } */}
                  <span onClick={this.logoutInfra}>Logout</span>
                </SubNav>
              </>
            ) : this.props.from === 'branch' ? (
              <>
                <Name>
                  <span>BRANCH:</span> {name}
                </Name>
                <SubNav className="infraSubNav">
                  {/* { isAdmin ?  */}
                  <A href={`/branch/${bankName}/info`}>Settings</A>
                  {/* //  : null } */}
                  <span onClick={this.logoutBranch}>Logout</span>
                </SubNav>
              </>
            ) : this.props.from === 'cashier' ? (
              <>
                <Name>
                  <span>CASHIER:</span> {name}
                </Name>
                <SubNav className="infraSubNav">
                  {/* { isAdmin ?  */}
                  <A href={`/cashier/${bankName}/info`}>Profile</A>
                  {/* //  : null } */}
                  <span onClick={this.logoutCashier}>Logout</span>
                </SubNav>
              </>
            ) : (
              <>
                <Name>
                  <span>MERCHANT:</span> {name}
                </Name>
                <SubNav className="bankSubNav">
                  <A href="/merchant/info">Settings</A>
                  <span onClick={this.logoutBank}>Logout</span>
                </SubNav>
              </>
            )}
          </div>
          <span style={{ paddingRight: '7px' }}>{currDate}</span>
        </WelcomeWrap>
      </>
    );
  }
}

export default Welcome;
