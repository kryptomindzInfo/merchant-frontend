import React from 'react';
import { Send } from '@material-ui/icons';
import Button from './Button';
import Card from './Card';
import Row from './Row';
import Col from './Col';

const EWalletBalanceSendAndClaimMoneyCard = (props) => {
  return (
    <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
      <h3>E-WALLET</h3>
      <h5>Available:</h5>
      <div className="cardValue">XOF 500</div>
      <Row style={{ paddingTop: '20px' }}>
        <Col cW="100%">
          <Button flex style={{ padding: '5px' }}>
            <Send fontSize="small" />
            Send Money
          </Button>
        </Col>
        <Col cW="100%">
          <Button flex style={{ padding: '5px' }}>
            <Send fontSize="small" />
            Claim Money
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default EWalletBalanceSendAndClaimMoneyCard;
