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

class BranchNav extends Component {
  render() {
    const { branchName } = this.props;
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    const branches = this.props.active === 'branch' ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <A href={`/branch/${branchName}/dashboard`}>
            <Link active={dashboard}>Dashboard</Link>
          </A>
          <A href={`/branch/cashiers/${branchName}`}>
            <Link active={branches}>Cashier</Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

BranchNav.propTypes = {
  branchName: PropTypes.string.isRequired,
};

export default BranchNav;
