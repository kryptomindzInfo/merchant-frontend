import React from 'react';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';

const AmountCards = (props) => {
  const raised = props.raised ? props.raised : 0;
  const paid = props.paid ? props.paid : 0;
  const pending = props.pending ? props.pending : 0;
  const counter = props.counter ? props.counter : 0;
  return (
    <Row>
      <Col>
        <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
          <h4>Amount Raised</h4>
          <div className="cardValue">{raised}</div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
          <h4>Amount Paid</h4>
          <div className="cardValue">{paid}</div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
          <h4>Amount Pending</h4>
          <div className="cardValue">{pending}</div>
        </Card>
      </Col>
      <Col>
        <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
          <h4>Counter Amount</h4>
          <div className="cardValue">{counter}</div>
        </Card>
      </Col>
      
    </Row>
  );
};
export default AmountCards;
