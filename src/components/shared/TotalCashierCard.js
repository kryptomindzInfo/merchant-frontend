import React from 'react';
import Card from './Card';
import Col from './Col';
import { CURRENCY } from '../constants';

const TotalCashierCard = () => {
  return (
    <Col cW="25%">
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h4>Total Staff Position</h4>
        <div className="cardValue">1</div>
      </Card>
    </Col>
  );
};

export default TotalCashierCard;
