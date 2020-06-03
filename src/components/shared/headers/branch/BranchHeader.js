import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BranchNav from './BranchNav';
import TopBar from '../TopBar';
import Welcome from '../Welcome';
import Container from '../../Container';
import A from '../../A';
import { STATIC_URL } from '../../../constants';

const Link = styled.span`
  color: #fff;
  font-size: 18px;
  margin: 0 40px 0 0;
  padding-bottom: 7px;
  display: block;
  font-weight: normal;
  border-radius: 8px;
  border: solid 2px #ffffff;
  padding: 5px 20px;
`;
const MiddleTitle = styled.div`
  display: flex;
  justify-content: center;
`;
const token = localStorage.getItem('merchantLogged');
const merchantName = localStorage.getItem('merchantName');
const logo = localStorage.getItem('merchantLogo');

let permissions = localStorage.getItem('permissions');
if (permissions !== 'all' && permissions !== '') {
  permissions = JSON.parse(permissions);
}

class BranchHeader extends Component {
  constructor() {
    super();
    this.state = {
      logo,
      name: 'Demo',
    };
  }

  componentDidMount() {}

  render() {
    const { page, branchName } = this.props;
    return (
      <TopBar>
        <Welcome from="branch" bankName={branchName} />
        <Container>
          {page === 'info' ? (
            <A href={this.props.goto} float="left">
              <Link>Back</Link>
            </A>
          ) : null}

          <A href={`/merchant/branch/${branchName}/dashboard`} float="left">
            <div className="bankLogo">
              <img src={STATIC_URL + this.state.logo} alt="Merchant Logo" />
            </div>
            <h2>{this.state.name.toUpperCase()}</h2>
          </A>
          {this.props.middleTitle ? (
            <MiddleTitle className="middleTitle">
              {this.props.middleTitle}
            </MiddleTitle>
          ) : null}
          {page === 'info' ? null : (
            <BranchNav active={this.props.active} branchName={branchName} />
          )}
        </Container>
      </TopBar>
    );
  }
}

BranchHeader.propTypes = {
  branchName: PropTypes.string.isRequired,
};

export default BranchHeader;
