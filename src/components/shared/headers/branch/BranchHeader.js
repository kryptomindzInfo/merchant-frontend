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
  const branchLogged = JSON.parse(localStorage.getItem('branchLogged')) || {};
  const branchName = branchLogged.details.name || '';
  const { page } = props;

  return (
    <TopBar>
      <Welcome from="branch" branchName={branchName} />
      <Container>
        {page === 'info' ? (
          <A href={props.goto} float="left">
            <Link>Back</Link>
          </A>
        ) : null}

        <A href="/merchant/branch/dashboard" float="left">
          <h2>{branchName.toUpperCase()}</h2>
        </A>
        {props.middleTitle ? (
          <MiddleTitle className="middleTitle">{props.middleTitle}</MiddleTitle>
        ) : null}
        {page === 'info' ? null : (
          <BranchNav name={branchName} active={props.active} />
        )}
      </Container>
    </TopBar>
  );
};

export default BranchHeader;
