import React from 'react';
import Card from './Card';
import Col from './Col';

const InvoiceNumberCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
        <h4>Invoices raised</h4>
        <div className="cardValue">{props.no}</div>
      </Card>
    </Col>
  );
};

export default InvoiceNumberCard;
