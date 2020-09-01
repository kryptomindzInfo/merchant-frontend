import React, { Component } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
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

class CashierNav extends Component {
  render() {
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    const bills = this.props.active === 'bills' ? 'true' : '';
    const { bankName } = this.props;

    return (
      <React.Fragment>
        <NavTag>
          <A href="/cashier/dashboard">
            <Link active={dashboard}>Dashboard</Link>
          </A>
          <A href="/paybills">
            <Link active={bills}>
              <span> Pay Bills </span>
            </Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default CashierNav;
