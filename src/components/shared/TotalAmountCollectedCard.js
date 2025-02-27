import React from 'react';
import Card from './Card';
import Col from './Col';

const TotalAmountCollectedCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
        <h4>Cash Received</h4>
        <div className="cardValue"> XOF {props.amount}</div>
      </Card>
    </Col>
  );
};

export default TotalAmountCollectedCard;
