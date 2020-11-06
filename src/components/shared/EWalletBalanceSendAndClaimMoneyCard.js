import React, { useEffect, useState } from 'react';
import Card from './Card';
import A from './A';
import { getWalletBalance } from '../merchant/api/MerchantAPI';
import { CURRENCY } from '../constants';

const EWalletBalanceSendAndClaimMoneyCard = (props) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getWalletBalance();
      setBalance(data.toFixed(2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
      <h3>
        E-WALLET
      </h3>
      <h5 style={{ display: 'flex', justifyContent: 'space-between' }}>
        Available:
        <A href="/merchant/operationalHistory">
          <span className="history" style={{ position: 'inherit' }}>History</span>
        </A>
      </h5>
      <div className="cardValue">
        {CURRENCY} {balance}
      </div>
    </Card>
  );
};

export default EWalletBalanceSendAndClaimMoneyCard;
