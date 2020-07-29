import React, { Component, Fragment } from 'react';
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

const Welcome = (props) => {
  const { type } = props;
  let name = '';
  if (type === 'merchant') {
    // eslint-disable-next-line prefer-destructuring
    name = JSON.parse(localStorage.getItem(`${type}Logged`)).details.name;
  } else {
    name = localStorage.getItem(`${type}_name`);
  }

  const logoutMerchant = () => {
    localStorage.removeItem('merchantLogged');
    localStorage.removeItem(`merchant_name`);
    history.push(`/merchant/${name}/login`);
  };

  const logoutBranch = () => {
    localStorage.removeItem('branchLogged');
    localStorage.removeItem(`branch_name`);
    history.push(`/merchant/branch/${name}/login`);
  };

  const logoutCashier = () => {
    localStorage.removeItem('cashierLogged');
    localStorage.removeItem(`cashier_name`);
    history.push(`/merchant/cashier/${name}/login`);
  };

  const logoutUser = () => {
    switch (type) {
      case 'merchant':
        logoutMerchant();
        break;
      case 'branch':
        logoutBranch();
        break;
      case 'cashier':
        logoutCashier();
        break;
      default:
        logoutMerchant();
        break;
    }
  };

  let isAdmin = false;
  let settingsUrl = '';
  if (type === 'merchant') {
    settingsUrl = '/merchant/settings';
  } else if (type === 'branch') {
    settingsUrl = `/branch/settings`;
  } else if (type === 'cashier') {
    settingsUrl = `/cashier/settings`;
  } else {
    isAdmin = localStorage.getItem('isAdmin');
  }
  const tempDate = new Date();
  const date = `${tempDate.getDate()}-${
    tempDate.getMonth() + 1
  }-${tempDate.getFullYear()} `;
  const currDate = `${date}`;
  return (
    <Fragment>
      <WelcomeWrap className="clr">
        <Icon className="material-icons fl">
          <NotificationIcon />
        </Icon>
        <div className="dropdown fl">
          <Name>
            <span>{type === 'cashier' ? 'STAFF' : type.toUpperCase()}:</span>{' '}
            {name}
          </Name>
          <SubNav className="bankSubNav">
            <A href={settingsUrl}>Settings</A>
            <span onClick={() => logoutUser()}>Logout</span>
          </SubNav>
        </div>
        <span style={{ paddingRight: '7px' }}>{currDate}</span>
      </WelcomeWrap>
    </Fragment>
  );
};

export default Welcome;
