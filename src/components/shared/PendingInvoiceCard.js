import React from 'react';
import Card from './Card';
import Col from './Col';

const PendingInvoiceCard = () => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h4>Pending No of Invoices</h4>
        <div className="cardValue">9092</div>
      </Card>
    </Col>
  );
};

export default PendingInvoiceCard;
