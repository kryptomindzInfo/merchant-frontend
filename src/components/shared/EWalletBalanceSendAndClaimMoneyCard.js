import React, { Fragment, useState, useEffect } from 'react';
import { Send } from '@material-ui/icons';
import Button from './Button';
import Card from './Card';
import Row from './Row';
import Col from './Col';
import { getWalletBalance } from '../merchant/api/MerchantAPI';
import { CURRENCY } from '../constants';

const EWalletBalanceSendAndClaimMoneyCard = (props) => {
  const { showClaimButton } = props;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getWalletBalance();
      setBalance(data.toFixed(2));
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
      <h3>E-WALLET</h3>
      <h5>Available:</h5>
      <div className="cardValue">
        {CURRENCY} {balance}
      </div>
      <Row style={{ paddingTop: '20px' }}>
        <Col cW="100%">
          <Button flex style={{ padding: '5px' }}>
            <Send fontSize="small" />
            Send Money
          </Button>
        </Col>
        {showClaimButton ? (
          <Col cW="100%">
            <Button flex style={{ padding: '5px' }}>
              <Send fontSize="small" />
              Claim Money
            </Button>
          </Col>
        ) : (
          ''
        )}
      </Row>
    </Card>
  );
};

export default EWalletBalanceSendAndClaimMoneyCard;
