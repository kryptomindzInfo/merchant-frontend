import React, { Component } from 'react';
import styled from 'styled-components';

import MerchantNav from './MerchantNav';
import Welcome from '../Welcome';
import Container from '../../Container';
import A from '../../A';
import { STATIC_URL } from '../../../constants';
import TopBar from '../TopBar';

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

const token = localStorage.getItem('bankLogged');
const name = 'Airtel';
const logo = 'sdjjdnnas.jpg';

let permissions = localStorage.getItem('permissions');
if (permissions !== 'all' && permissions !== '') {
  permissions = JSON.parse(permissions);
}

class MerchantHeader extends Component {
  constructor() {
    super();
    this.state = {
      logo,
      name,
    };
  }

  componentDidMount() {}

  render() {
    const { page } = this.props;
    return (
      <TopBar>
        <Welcome from="bank" />
        <Container>
          <A href="/merchant/dashboard" float="left">
            <div className="bankLogo">
              <img src={STATIC_URL + this.state.logo} alt="Bank Logo" />
            </div>
            <h2>{this.state.name.toUpperCase()}</h2>
          </A>
          {this.props.middleTitle ? (
            <div className="middleTitle">{this.props.middleTitle}</div>
          ) : null}
          {page === 'branch' ? null : (
            <MerchantNav active={this.props.active} />
          )}
        </Container>
      </TopBar>
    );
  }
}

export default MerchantHeader;
