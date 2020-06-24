import React from 'react';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';

const CashierWallet = (props) => {
  const limit = 1000;
  const inHand = 100;
  const received = 200;
  const paid = 500;

  return (
    <Row>
      <Col>
        <Card marginBottom="54px" buttonMarginTop="32px" bordered smallValue>
          <h4>Transaction Limit</h4>
          <h5> Available</h5>
          <div className="cardValue">
            {CURRENCY} {limit.toFixed(2)}
          </div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="54px" buttonMarginTop="32px" bordered smallValue>
          <h4>Money Paid Today</h4>
          <h5>Available</h5>
          <div className="cardValue">
            {CURRENCY} {paid.toFixed(2)}
          </div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="54px" buttonMarginTop="32px" bordered smallValue>
          <h4>Money Recieved Today</h4>
          <h5>Available</h5>
          <div className="cardValue">
            {CURRENCY} {received.toFixed(2)}
          </div>
        </Card>
      </Col>
    </Row>
  );
};
export default CashierWallet;
