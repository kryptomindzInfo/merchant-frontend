import React from 'react';
import Card from './Card';
import Col from './Col';

const TotalPenaltyCollectedCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>Penalty Collected</h4>
        <div className="cardValue"> XOF {props.penalty}</div>
      </Card>
    </Col>
  );
};

export default TotalPenaltyCollectedCard;
