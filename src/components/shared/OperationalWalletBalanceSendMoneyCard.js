import React from 'react';
import { Send } from '@material-ui/icons';
import Button from './Button';
import Card from './Card';
import Row from './Row';
import Col from './Col';

const OperationalWalletBalanceSendMoneyCard = (props) => {
  return (
    <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
      <h3>Operational Wallet</h3>
      <Row style={{ paddingTop: '20px' }}>
        <Col cW="100%">
          <h5>Available:</h5>
        </Col>
        <Col cW="100%" textAlign="right">
          <h5 style={{ color: 'orange', fontWeight: 'bold' }}>History</h5>
        </Col>
      </Row>
      <div className="cardValue">XOF 500</div>
    </Card>
  );
};

export default OperationalWalletBalanceSendMoneyCard;
