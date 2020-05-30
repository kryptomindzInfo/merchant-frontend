import React from 'react';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';

const InvoiceCards = (props) => {
  const limit = 1000;
  const inHand = 100;
  const paid = 500;

  return (
    <Row>
      <Col>
        <Card marginBottom="54px" buttonMarginTop="32px" bordered smallValue>
          <h4>Total Payment Received </h4>
          <div className="cardValue">
            {CURRENCY} {limit.toFixed(2)}
          </div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="54px" buttonMarginTop="32px" bordered smallValue>
          <h4>No. of Invoice Paid</h4>
          <div className="cardValue">
            {CURRENCY} {inHand.toFixed(2)}
          </div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="54px" buttonMarginTop="32px" bordered smallValue>
          <h4>No. of Pending Invoice</h4>
          <div className="cardValue">
            {CURRENCY} {paid.toFixed(2)}
          </div>
        </Card>
      </Col>
    </Row>
  );
};
export default InvoiceCards;
