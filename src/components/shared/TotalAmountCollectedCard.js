import React from 'react';
import Card from './Card';
import Col from './Col';

const TotalAmountCollectedCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>Amount Collected</h4>
        <div className="cardValue">{props.amount}</div>
      </Card>
    </Col>
  );
};

export default TotalAmountCollectedCard;
