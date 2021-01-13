import React from 'react';
import Card from './Card';
import Col from './Col';
import { CURRENCY } from '../constants';

const OverDueInvoiceCard = (props) => {
  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>Amount Due</h4>
        <div className="cardValue">{CURRENCY} {props.amountdue}</div>
      </Card>
    </Col>
  );
};

export default OverDueInvoiceCard;
