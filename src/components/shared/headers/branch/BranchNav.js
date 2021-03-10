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

class BranchNav extends Component {
  render() {
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    const reports = this.props.active === 'reports' ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <A href="/branch/dashboard">
            <Link active={dashboard}>Dashboard</Link>
          </A>
          <A href="/branch/reports">
            <Link active={reports}>Reports</Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default BranchNav;
