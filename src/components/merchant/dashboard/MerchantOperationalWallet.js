import React, { useEffect, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';
import Button from '../../shared/Button';
import A from '../../shared/A';
// eslint-disable-next-line import/named
import { getWalletBalance } from '../api/MerchantAPI';

const MerchantOperationalWallet = () => {
  const [balance, setBalance] = useState(0);

  /* useEffect(() => {
    const fetchBalance = async () => {
      const data = await getBalance();
      setBalance(data);
    };
    fetchBalance();
  }, []); */

  return (
    <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
      <h3>Operational Wallet</h3>
      <h5>Available</h5>
      <div className="cardValue">
        {CURRENCY} {balance.toFixed(2)}
      </div>
      {
        <Button style={{ display: 'flex' }} className="sendMoneyButton">
          <i className="material-icons">
            <SendIcon />
          </i>
          Send Money
        </Button>
      }
      <A>
        <span className="history">History</span>
      </A>
    </Card>
  );
};

export default MerchantOperationalWallet;
