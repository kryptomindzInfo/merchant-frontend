import React from 'react';
import Card from './Card';
import Col from './Col';

const PaidInvoiceCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>No of invoices paid</h4>
        <div className="cardValue">{props.no}</div>
      </Card>
    </Col>
  );
};

export default PaidInvoiceCard;