import React, { useEffect, useState } from 'react';
import Card from './Card';
import Col from './Col';
import { CURRENCY } from '../constants';
import { getWalletBalance } from '../merchant/api/MerchantAPI';

const PaymentReceivedCard = (props) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getWalletBalance();
      setBalance(data.toFixed(2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Col cW="100%">
      <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
        <h4>Payment Received </h4>
        <div className="cardValue">
          {CURRENCY} {balance}
        </div>
      </Card>
    </Col>
  );
};

export default PaymentReceivedCard;
