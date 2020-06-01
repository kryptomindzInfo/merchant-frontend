import React, { Component } from 'react';
import EWalletBalanceSendAndClaimMoneyCard from '../EWalletBalanceSendAndClaimMoneyCard';
import Sidebar from './Sidebar';

const MerchantSideBar = (props) => {
  const { showClaimButton } = props;

  return (
    <Sidebar marginRight>
      <EWalletBalanceSendAndClaimMoneyCard showClaimButton={showClaimButton} />
    </Sidebar>
  );
};

export default MerchantSideBar;
