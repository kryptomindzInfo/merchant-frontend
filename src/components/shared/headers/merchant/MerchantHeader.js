import React, { Component } from 'react';
import styled from 'styled-components';
import MerchantNav from './MerchantNav';
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
const merchantLogged = JSON.parse(localStorage.getItem('merchantLogged')) || {};
const merchantName = merchantLogged.details.name;
const logo = merchantLogged.details.logo_hash;

class MerchantHeader extends Component {
  constructor() {
    super();
    this.state = {
      logo,
    };
  }

  componentDidMount() {}

  render() {
    const { page } = this.props;
    return (
      <TopBar>
        <Welcome from="merchant" />
        <Container>
          {page === 'info' ? (
            <A href={this.props.goto} float="left">
              <Link>Back</Link>
            </A>
          ) : null}

          <A href="/dashboard" float="left">
            <div className="bankLogo">
              <img src={STATIC_URL + this.state.logo} alt="Merchant Logo" />
            </div>
            <h2>{merchantName.toUpperCase()}</h2>
          </A>
          {this.props.middleTitle ? (
            <MiddleTitle className="middleTitle">
              {this.props.middleTitle}
            </MiddleTitle>
          ) : null}
          {page === 'info' ? null : <MerchantNav active={this.props.active} />}
        </Container>
      </TopBar>
    );
  }
}

export default MerchantHeader;
