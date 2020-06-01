import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MerchantOperationalWallet from '../../merchant/dashboard/MerchantOperationalWallet';

class MerchantSideBar extends Component {
  render() {
    return (
      <Sidebar marginRight>
        <MerchantOperationalWallet activateNeeded />
      </Sidebar>
    );
  }
}

export default MerchantSideBar;
