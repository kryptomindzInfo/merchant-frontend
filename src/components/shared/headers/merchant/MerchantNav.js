import React, { Component } from 'react';
import styled from 'styled-components';
import A from '../../A';

const NavTag = styled.nav`
  float: left;
  margin: 8px 27px;
`;

const Link = styled.span`
  color: #fff;
  font-size: 18px;
  margin: 0 12px;
  padding-bottom: 7px;
  font-weight: normal;
  border-bottom: ${(props) =>
    props.active === 'true' ? '1px solid white' : '0'};
`;

class MerchantNav extends Component {
  render() {
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    const branches = this.props.active === 'branch' ? 'true' : '';
    const cashier = this.props.active === 'cashier' ? 'true' : '';
    const staff = this.props.active === 'staff' ? 'true' : '';
    const reports = this.props.active === 'reports' ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <A href="/merchant/dashboard">
            <Link active={dashboard}>Dashboard</Link>
          </A>
          <A href="/merchant/branches">
            <Link active={branches}>Branches</Link>
          </A>
          <A href="/merchant/staff">
            <Link active={staff}>Staff</Link>
          </A>
          <A>
            <Link active={reports}>Reports</Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default MerchantNav;
