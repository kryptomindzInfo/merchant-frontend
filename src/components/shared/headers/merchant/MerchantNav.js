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
    const cashier = this.props.active === 'cashier' ? 'true' : '';
    const staff = this.props.active === 'staff' ? 'true' : '';
    const reports = this.props.active === 'reports' ? 'true' : '';
    const offerings = this.props.active === 'offerings' ? 'true' : '';
    const taxes = this.props.active === 'taxes' ? 'true' : '';
    const customers = this.props.active === 'customers' ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <A href="/merchant/dashboard">
            <Link active={dashboard}>Dashboard</Link>
          </A>
          <A href="/merchant/staff">
            <Link active={staff}>Users</Link>
          </A>
          <A href="/merchant/report">
            <Link active={reports}>Reports</Link>
          </A>
          <A href="/merchant/offerings">
            <Link active={offerings}>Offerings</Link>
          </A>
          <A href="/merchant/taxes">
            <Link active={taxes}>Taxes</Link>
          </A>
          <A href="/merchant/customers">
            <Link active={customers}>Customers</Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default MerchantNav;
