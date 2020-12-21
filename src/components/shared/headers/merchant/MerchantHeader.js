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

const MerchantHeader = (props) => {
  const merchantLogged =
    JSON.parse(localStorage.getItem('merchantLogged')) || {};
  const merchantName = merchantLogged.details.name || '';
  const logo = merchantLogged.details.logo || '';
  const { page } = props;

  return (
    <TopBar>
      <Welcome type="merchant" />
      <Container>
        {page === 'info' ? (
          <A href={props.goto} float="left">
            <Link>Dashboard</Link>
          </A>
        ) : null}

        <A href="/merchant/dashboard" float="left">
          <div className="bankLogo">
            <img src={STATIC_URL + logo} alt="Merchant Logo" />
          </div>
          <h2>{merchantName.toUpperCase()}</h2>
        </A>
        {props.middleTitle ? (
          <MiddleTitle className="middleTitle">{props.middleTitle}</MiddleTitle>
        ) : null}
        {page === 'info' ? null : <MerchantNav active={props.active} />}
      </Container>
    </TopBar>
  );
};

export default MerchantHeader;
