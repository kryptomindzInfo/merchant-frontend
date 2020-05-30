import React from 'react';
import Card from './Card';
import Col from './Col';

const GroupNumberCard = () => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h4>No of Groups</h4>
        <div className="cardValue">500</div>
      </Card>
    </Col>
  );
};

export default GroupNumberCard;
