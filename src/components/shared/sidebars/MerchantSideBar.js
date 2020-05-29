import React, { Component } from 'react';
import styled from 'styled-components';
import EWalletBalanceSendMoneyCard from '../EWalletBalanceSendMoneyCard';
import EWalletBalanceSendAndClaimMoneyCard from '../EWalletBalanceSendAndClaimMoneyCard';

const Sidebar = styled.aside`
  width: 260px;
  float: left;
  margin-right: ${(props) => (props.marginRight ? '33px' : '0')};
`;

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
