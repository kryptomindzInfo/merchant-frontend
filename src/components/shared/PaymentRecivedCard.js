import React from 'react';
import Card from './Card';
import Col from './Col';

const PaymentRecivedCard = () => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>Payment Received today</h4>
        <div className="cardValue">$500</div>
      </Card>
    </Col>
  );
};

export default PaymentRecivedCard;
