import React from 'react';
import Card from './Card';
import Col from './Col';

const GroupNumberCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        {/* <h4>No of Groups</h4> */}
        <h4>No of Category</h4>
        <div className="cardValue">{props.no}</div>
      </Card>
    </Col>
  );
};

export default GroupNumberCard;
