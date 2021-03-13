import React, { useEffect, useState } from 'react';
import Card from './Card';
import Col from './Col';
import { CURRENCY } from '../constants';
import { getWalletBalance } from '../merchant/api/MerchantAPI';

const PaymentReceivedCard = (props) => {

  return (
    <Col cW="100%">
       <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
        <h4>Amount Collected </h4>
        <div className="cardValue">
          {CURRENCY} {props.amount}
        </div>
      </Card>
    </Col>
  );
};

export default PaymentReceivedCard;
