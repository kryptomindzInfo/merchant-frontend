import React from 'react';
import styled from 'styled-components';
import CashierNav from './CashierNav';
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

const CashierHeader = (props) => {
  const { page, goto, middleTitle, active } = props;
  const { name } = JSON.parse(localStorage.getItem(`cashierLogged`)).cashier;
  const logo = JSON.parse(localStorage.getItem(`cashierLogged`)).merchant.logo || '';

  return (
    <TopBar>
      <Welcome type="cashier" />
      <Container>
        {page === 'info' ? (
          <A href={goto} float="left">
            <Link>Back</Link>
          </A>
        ) : null}

        <A href="/cashier/dashboard" float="left">
        <div className="bankLogo">
            <img src={STATIC_URL + logo} alt="Merchant Logo" />
          </div>
          <h2>{name.toUpperCase()}</h2>
        </A>
        {props.middleTitle ? (
          <MiddleTitle className="middleTitle">{middleTitle}</MiddleTitle>
        ) : null}
        {page === 'info' ? null : <CashierNav active={active} />}
      </Container>
    </TopBar>
  );
};

export default CashierHeader;