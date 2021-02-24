import React, { Component } from 'react';
import styled from 'styled-components';
import A from '../../A';
import Button from '../../Button';

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

class StaffNav extends Component {
   constructor() {
    super();
    this.state = { payBillsPopup: false };
  } 

  render() {
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    const reports = this.props.active === 'reports' ? 'true' : '';
    
    return (
      <>
        <NavTag>
          <A href="/staff/dashboard">
            <Link active={dashboard}>Dashboard</Link>
          </A>
        </NavTag>
        <NavTag>
          <A href="/staff/reports">
            <Link active={reports}>Reports</Link>
          </A>
        </NavTag>
      </>
    );
  }
}

export default StaffNav;
