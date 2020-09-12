import React, { Component } from 'react';
import styled from 'styled-components';
import PayBillPopup from '../../../cashier/MerchantPayBills/PayBillPopup';
import A from '../../A';
import Button from '../../Button';

const NavTag = styled.nav`
  float: left;
  margin: 8px 27px;
`;

const Link = styled.span`
  color: #fff;
  font-size: 18px;
  margin: 0 12px;
  padding-bottom: 7px;
  font-weight: normal;
  border-bottom: ${(props) =>
    props.active === 'true' ? '1px solid white' : '0'};
`;

class CashierNav extends Component {
   constructor() {
    super();
    this.state = { payBillsPopup: false };
  } 

  onPayBillsPopupClose = () => {
    this.setState({ payBillsPopup: false });
  };

  onPayBillsPopupOpen = () => {
    this.setState({ payBillsPopup: true });
    console.log(this.state.payBillsPopup);
  }; 

  render() {
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    
    return (
      <>
        <NavTag>
          {/* <A href="/paybills"> */}
          <A>
            <Link>
              <span onClick={() => {this.onPayBillsPopupOpen()}}> Pay Bills </span>
            </Link>
          </A>
          {/* <Button onClick={this.onPayBillsPopupOpen}>Pay Bills</Button> */}
          {/* <PayBillPopup close={() => this.onPayBillsPopupClose()} /> */}
        </NavTag>

        {this.state.payBillsPopup ? (
          <PayBillPopup close={() => this.onPayBillsPopupClose()} />
        ) : (
          ''
        )}
      </>
    );
  }
}

export default CashierNav;