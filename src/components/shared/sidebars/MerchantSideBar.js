import React, { Component } from 'react';
import EWalletBalanceSendAndClaimMoneyCard from '../EWalletBalanceSendAndClaimMoneyCard';
import Sidebar from './Sidebar';

const MerchantSideBar = (props) => {
  return (
    <Sidebar marginRight>
      <EWalletBalanceSendAndClaimMoneyCard />
    </Sidebar>
  );
};

export default MerchantSideBar;
