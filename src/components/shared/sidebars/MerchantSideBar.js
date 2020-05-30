import React, { Component } from 'react';
import EWalletBalanceSendMoneyCard from '../EWalletBalanceSendMoneyCard';
import EWalletBalanceSendAndClaimMoneyCard from '../EWalletBalanceSendAndClaimMoneyCard';
import Sidebar from './Sidebar';

class MerchantSideBar extends Component {
  render() {
    return (
      <Sidebar marginRight>
        <EWalletBalanceSendMoneyCard />
        <EWalletBalanceSendAndClaimMoneyCard />
      </Sidebar>
    );
  }
}

export default MerchantSideBar;
