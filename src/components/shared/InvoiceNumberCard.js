import React from 'react';
import Card from './Card';
import Col from './Col';

const InvoiceNumberCard = () => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>No of Invoice paid</h4>
        <div className="cardValue">552</div>
      </Card>
    </Col>
  );
};

export default InvoiceNumberCard;
