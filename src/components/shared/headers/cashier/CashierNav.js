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
    const { name } = this.props;
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    const branches = this.props.active === 'branch' ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <A href={`/merchant/cashier/${name}/dashboard`}>
            <Link active={dashboard}>Dashboard</Link>
          </A>
          <A href={`/merchant/cashier/${name}/invoices`}>
            <Link active={branches}>Invoices</Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

CashierNav.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CashierNav;
