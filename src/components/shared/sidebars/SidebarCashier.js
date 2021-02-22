import React, { Component } from "react";
import CashierCashInHand from './CashierCashInHand';
import CashierClosingBalance from './CashierClosingBalance';
import CashierOpeningBalance from './CashierOpeningBalance';

import Sidebar from './Sidebar';

class SidebarCashier extends Component {
  render() {
    return (
      <Sidebar marginRight>
        <CashierOpeningBalance/>
        <CashierCashInHand/>
        <CashierClosingBalance/>
      </Sidebar>
    );
  }
}
 
export default SidebarCashier;