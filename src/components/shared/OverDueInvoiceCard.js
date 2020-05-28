import React from 'react';
import Card from './Card';
import Col from './Col';

const OverDueInvoiceCard = () => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h4>Over due Invoices</h4>
        <div className="cardValue">353</div>
      </Card>
    </Col>
  );
};

export default OverDueInvoiceCard;
