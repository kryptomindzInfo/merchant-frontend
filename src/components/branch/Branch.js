import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, makeStyles } from '@material-ui/core';
import MainHeader from '../utils/MainHeader';
import EWalletBalanceSendAndClaimMoneyCard from '../shared/EWalletBalanceSendAndClaimMoneyCard';
import PaymentRecivedCard from '../utils/PaymentRecivedCard';
import InvoiceNumberCard from '../utils/InvoiceNumberCard';
import PendingInvoiceCard from '../utils/PendingInvoiceCard';
import OverDueInvoiceCard from '../utils/OverDueInvoiceCard';
import MerchantHeader from '../shared/headers/merchant/MerchantHeader';
import SideBar from '../shared/SideBar';

const styles = makeStyles((theme) => ({
  gridMargin: {
    padding: '2%',
    [theme.breakpoints.down('sm')]: {
      margin: '4%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '5%',
    },
  },
  gridMarginSides: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
}));
const Branch = () => {
  const classes = styles();
  return (
    <Fragment>
      <Helmet>
        <title>Branch</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <MerchantHeader />
      <SideBar />
    </Fragment>
  );
};

export default Branch;
