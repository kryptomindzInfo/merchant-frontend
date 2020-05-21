import React, { Component } from 'react';
import styled from 'styled-components';
import history from '../../utils/history';
import A from '../A';
import SubNav from './SubNav';

const WelcomeWrap = styled.div`
  float: right;
  margin: 7px 0;
  display: block;
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
    localStorage.removeItem('bankLogged');
    localStorage.removeItem('bankName');
    history.push('/bank');
  };

  logoutBranch = () => {
    localStorage.removeItem('branchLogged');
    localStorage.removeItem('branchName');
    history.push(`/branch/${this.props.bankName}`);
  };

  logoutCashier = () => {
    localStorage.removeItem('cashierLogged');
    history.push(`/cashier/${this.props.bankName}`);
  };

  render() {
    let name = '';
    let isAdmin = false;
    if (this.props.from === 'bank') {
      name = localStorage.getItem('bankName');
    } else if (this.props.from === 'branch') {
      name = localStorage.getItem('branchName');
    } else if (this.props.from === 'cashier') {
      name = localStorage.getItem('cashierName');
    } else {
      isAdmin = localStorage.getItem('isAdmin');
      name = localStorage.getItem('name');
    }
    const tempDate = new Date();
    const date = `${tempDate.getDate()}-${
      tempDate.getMonth() + 1
    }-${tempDate.getFullYear()} `;
    // tempDate.getHours() +
    // ':' +
    // tempDate.getMinutes() +
    // ':' +
    // tempDate.getSeconds();
    const currDate = `${date}`;

    const { bankName } = this.props;
    return (
      <>
        <WelcomeWrap className="clr">
          <span style={{ paddingRight: '7px' }}>{currDate}</span>
          <Icon className="material-icons fl">notifications</Icon>
          <div className="dropdown fl">
            {/* <Name>
            <FormattedMessage {...messages.welcome} /> {name}
          </Name> */}
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
                  <span>BANK:</span> {name}
                </Name>
                <SubNav className="bankSubNav">
                  <A href="/bank/info">Settings</A>
                  <span onClick={this.logoutBank}>Logout</span>
                </SubNav>
              </>
            )}
          </div>
        </WelcomeWrap>
      </>
    );
  }
}

export default Welcome;
