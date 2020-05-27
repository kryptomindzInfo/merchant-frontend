import React from 'react';
import Card from '../shared/Card';
import Col from '../shared/Col';

const PaymentRecivedCard = () => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h4>Payment Recieved today</h4>
        <div className="cardValue">$500</div>
      </Card>
    </Col>
  );
};

export default PaymentRecivedCard;
