import React, { Component } from 'react';
import styled from 'styled-components';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/PersonAdd';
import Card from '../../shared/Card';
import A from '../../shared/A';

const SidebarStyle = styled.aside`
  width: 260px;
  float: left;
  margin-right: ${(props) => (props.marginRight ? '33px' : '0')};
  .anchor {
    display: block;
  }
  :hover {
    color: #fff;
  }
  .material-icons {
    margin-right: 10px;
    margin-top: 0;
    color: #417505;
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
`;

const H3 = styled.h3`
  font-size: 11px;
  font-weight: bold;
  color: #323c47;
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #417505;
  text-align: center;
`;

function CashierSettingsSidebar(props)  {
    const info = props.active === 'info';
    const billnumber = props.active === 'billnumber';
    const role = JSON.parse(localStorage.getItem('cashierLogged')).position.type;
    return (
      <SidebarStyle marginRight>
        <h3>SETTINGS</h3>
        <A href="/cashier/settings">
          <Card rounded selected={info} className="sideNav">
            <i className="material-icons">
              <PersonIcon />
            </i>
            <h3>Staff Position Info</h3>
          </Card>
        </A>
        {role === 'staff' ? (
          <A href="/cashier/billsettings">
            <Card rounded selected={billnumber} className="sideNav">
              <i className="material-icons">
                <SettingsIcon />
              </i>
              <h3>Bill Number</h3>
            </Card>
          </A>
        ) : null}
      </SidebarStyle>
    );
  }

export default CashierSettingsSidebar;
