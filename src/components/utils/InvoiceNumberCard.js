import React from 'react';
import Card from '../shared/Card';
import Col from '../shared/Col';

const InvoiceNumberCard = () => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h4>No of Invoice paid</h4>
        <div className="cardValue">552</div>
      </Card>
    </Col>
  );
};

export default InvoiceNumberCard;
