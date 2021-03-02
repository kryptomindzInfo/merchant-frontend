import React from 'react';
import Card from './Card';
import Col from './Col';

const GroupNumberCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="20px" buttonMarginTop="32px" bigPadding smallValue style={{textAlign:'center'}}>
        {/* <h4>No of Groups</h4> */}
        <h4>Categories</h4>
        <div className="cardValue">{props.no}</div>
      </Card>
    </Col>
  );
};

export default GroupNumberCard;
