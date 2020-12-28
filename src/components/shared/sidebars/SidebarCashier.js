import React, { Component } from "react";
import CashierCashInHand from './CashierCashInHand';
import CashierClosingBalance from './CashierClosingBalance';

import Sidebar from './Sidebar';

class SidebarCashier extends Component {
  render() {
    return (
      <Sidebar marginRight>
        <CashierCashInHand/>
        <CashierClosingBalance/>
      </Sidebar>
    );
  }
}
 
export default SidebarCashier;