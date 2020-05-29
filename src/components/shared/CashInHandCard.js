import React from 'react';
import Card from './Card';
import Col from './Col';
import { CURRENCY } from '../constants';

const CashInHandCard = () => {
  return (
    <Col cW="25%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h4>Cash In Hand</h4>
        <div className="cardValue">{CURRENCY} 500</div>
      </Card>
    </Col>
  );
};

export default CashInHandCard;
