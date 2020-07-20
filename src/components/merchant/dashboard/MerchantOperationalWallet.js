import React, { useEffect, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';
import Button from '../../shared/Button';
import A from '../../shared/A';
import { getWalletBalance } from '../api/MerchantAPI';

const MerchantOperationalWallet = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const data = await getWalletBalance();
      setBalance(data);
    };
    fetchBalance();
  }, []);

  return (
    <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
      <h3>Operational Wallet</h3>
      <h5>Available</h5>
      <div className="cardValue">
        {CURRENCY} {balance.toFixed(2)}
      </div>
      <A href={'/merchant/operationalHistory'}>
          <span className="history">History</span>
      </A>
    </Card>
  );
};

export default MerchantOperationalWallet;
