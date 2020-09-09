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
  /* constructor() {
    super();
    this.state = { payBillsPopup: false };

    this.onPayBillsPopupClose = this.onPayBillsPopupClose.bind(this);
    this.onPayBillsPopupOpen = this.onPayBillsPopupOpen.bind(this);
  } */

  /* onPayBillsPopupClose = (e) => {
    e.stopPropagation();
    this.setState({ payBillsPopup: false });
  };

  onPayBillsPopupOpen = () => {
    this.setState({ payBillsPopup: true });
  }; */

  render() {
    const dashboard = this.props.active === 'dashboard' ? 'true' : '';
    const bills = this.props.active === 'bills' ? 'true' : '';

    return (
      <>
        <NavTag>
          <A href="/cashier/dashboard">
            <Link active={dashboard}>Dashboard</Link>
          </A>
          <A href="/paybills">
            <Link active={bills}>
              <span> Pay Bills </span>
            </Link>
          </A>
          {/* <Button onClick={this.onPayBillsPopupOpen}>Pay Bills</Button> */}
        </NavTag>

        {/* {this.state.payBillsPopup ? (
          <PayBillPopup close={() => this.onPayBillsPopupClose()} />
        ) : (
          ''
        )} */}
      </>
    );
  }
}

export default CashierNav;
