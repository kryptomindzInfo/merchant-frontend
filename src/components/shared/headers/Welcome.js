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
  logoutUser = (type) => {
    switch (type) {
      case 'merchant':
        this.logoutMerchant();
        break;
      case 'branch':
        this.logoutBranch();
        break;
      default:
        this.logoutMerchant();
        break;
    }
  };

  logoutMerchant = () => {
    localStorage.removeItem('merchantLogged');
    history.push('/merchant/login');
  };

  logoutBranch = () => {
    localStorage.removeItem('branchLogged');
    history.push(`/merchant/branch/${this.props.branchName}/login`);
  };

  /* logoutBank = () => {
    localStorage.removeItem('merchantLogged');
    localStorage.removeItem('merchantName');
    history.push('/merchant/login');
  };
  logoutCashier = () => {
    localStorage.removeItem('cashierLogged');
    history.push(`/cashier/${this.props.bankName}`);
    // this.props.history.push('/bank');
  }; */

  render() {
    let name = '';
    let isAdmin = false;
    let settingsUrl = '';
    if (this.props.from === 'merchant') {
      // eslint-disable-next-line prefer-destructuring
      name = JSON.parse(localStorage.getItem('merchantLogged')).details.name;
      settingsUrl = '/merchant/info';
    } else if (this.props.from === 'branch') {
      // eslint-disable-next-line prefer-destructuring
      name = JSON.parse(localStorage.getItem('branchLogged')).details.name;
      settingsUrl = `/merchant/branch/${this.props.branchName}/info`;
    } else if (this.props.from === 'cashier') {
      // eslint-disable-next-line prefer-destructuring
      name = JSON.parse(localStorage.getItem('cashierLogged')).details.name;
      settingsUrl = '/merchant/cashier/:cashierName/info';
    } else {
      isAdmin = localStorage.getItem('isAdmin');
    }
    const tempDate = new Date();
    const date = `${tempDate.getDate()}-${
      tempDate.getMonth() + 1
    }-${tempDate.getFullYear()} `;
    const currDate = `${date}`;
    return (
      <>
        <WelcomeWrap className="clr">
          <Icon className="material-icons fl">
            <NotificationIcon />
          </Icon>
          <div className="dropdown fl">
            <Name>
              <span>{this.props.from.toUpperCase()}:</span> {name}
            </Name>
            <SubNav className="bankSubNav">
              <A href={settingsUrl}>Settings</A>
              <span onClick={() => this.logoutUser(this.props.from)}>
                Logout
              </span>
            </SubNav>
          </div>
          <span style={{ paddingRight: '7px' }}>{currDate}</span>
        </WelcomeWrap>
      </>
    );
  }
}

export default Welcome;
