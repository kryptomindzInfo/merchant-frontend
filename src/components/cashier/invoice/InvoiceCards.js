import React from 'react';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';

const InvoiceCards = (props) => {
  const limit = 1000;
  const paidInvoives = props.paid;
  const unpaidInvoices = props.unpaid;

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
          <div className="cardValue">{paidInvoives}</div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="54px" buttonMarginTop="32px" bordered smallValue>
          <h4>No. of Pending Invoice</h4>
          <div className="cardValue">{unpaidInvoices}</div>
        </Card>
      </Col>
    </Row>
  );
};
export default InvoiceCards;
