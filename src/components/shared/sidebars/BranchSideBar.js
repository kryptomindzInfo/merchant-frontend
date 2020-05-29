import React, { Component } from 'react';
import styled from 'styled-components';
import OperationalWalletBalanceSendMoneyCard from '../OperationalWalletBalanceSendMoneyCard';

const Sidebar = styled.div`
  min-width: 260px;
  margin-right: ${(props) => (props.marginRight ? '33px' : '0')};
`;

class SideBar extends Component {
  render() {
    return (
      <Sidebar marginRight>
        {/* <OperationalWalletBalanceSendMoneyCard /> */}
      </Sidebar>
    );
  }
}

export default SideBar;
