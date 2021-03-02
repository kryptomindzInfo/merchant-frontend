import React from 'react';
import Card from './Card';
import Col from './Col';

const TotalPenaltyCollectedCard = (props) => {
  return (
    <Col cW="100%">
     <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
        <h4>Penalty Collected</h4>
        <div className="cardValue"> XOF {props.penalty}</div>
      </Card>
    </Col>
  );
};

export default TotalPenaltyCollectedCard;
