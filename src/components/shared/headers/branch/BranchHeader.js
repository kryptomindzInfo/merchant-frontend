import React, { Component } from 'react';
import styled from 'styled-components';
import TopBar from '../TopBar';
import Welcome from '../Welcome';
import Container from '../../Container';
import A from '../../A';
import { STATIC_URL } from '../../../constants';
import BranchNav from './BranchNav';

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

const BranchHeader = (props) => {
  const { page, goto, middleTitle, active } = props;
  const { name } = JSON.parse(localStorage.getItem('branchLogged')).details;

  return (
    <TopBar>
      <Welcome type="branch" />
      <Container>
        {page === 'info' ? (
          <A href={goto} float="left">
            <Link>Back</Link>
          </A>
        ) : null}

        <A href="/branch/dashboard" float="left">
          <h2>{name.toUpperCase()}</h2>
        </A>
        {middleTitle ? (
          <MiddleTitle className="middleTitle">{middleTitle}</MiddleTitle>
        ) : null}
        {page === 'info' ? null : <BranchNav active={active} />}
      </Container>
    </TopBar>
  );
};

export default BranchHeader;
