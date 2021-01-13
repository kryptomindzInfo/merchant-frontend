import React, { useEffect, useState } from 'react';
import Card from './Card';
import Col from './Col';
import { CURRENCY } from '../constants';
import { getWalletBalance } from '../merchant/api/MerchantAPI';

const PaymentReceivedCard = (props) => {

  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>Amount Collected Today </h4>
        <div className="cardValue">
          {CURRENCY} {props.amount}
        </div>
      </Card>
    </Col>
  );
};

export default PaymentReceivedCard;
