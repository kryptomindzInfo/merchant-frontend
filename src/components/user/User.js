import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, makeStyles } from '@material-ui/core';
import MainHeader from '../utils/MainHeader';
import PaymentRecivedCard from '../utils/PaymentRecivedCard';
import InvoiceNumberCard from '../utils/InvoiceNumberCard';
import PendingInvoiceCard from '../utils/PendingInvoiceCard';
import OverDueInvoiceCard from '../utils/OverDueInvoiceCard';
import EWalletBalanceSendAndClaimMoneyCard from '../shared/EWalletBalanceSendAndClaimMoneyCard';

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
const User = () => {
  const classes = styles();
  return (
    <Fragment>
      <Helmet>
        <title>Branch</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <MainHeader />
      <Grid container>
        <Grid item md={3} sm={12} xs={12}>
          <Grid item className={classes.gridMargin}>
            <EWalletBalanceSendAndClaimMoneyCard />
          </Grid>
        </Grid>
        <Grid item md={9} sm={12} xs={12}>
          <Grid container direction="column">
            <Grid
              container
              direction="row"
              className={`${classes.gridMargin} ${classes.gridMarginSides}`}
            >
              <Grid
                item
                md={3}
                sm={6}
                xs={6}
                className={classes.gridMarginSides}
              >
                <PaymentRecivedCard />
              </Grid>
              <Grid
                item
                md={3}
                sm={6}
                xs={6}
                className={classes.gridMarginSides}
              >
                <InvoiceNumberCard />
              </Grid>
              <Grid
                item
                md={3}
                sm={6}
                xs={6}
                className={classes.gridMarginSides}
              >
                <PendingInvoiceCard />
              </Grid>
              <Grid
                item
                md={3}
                sm={6}
                xs={6}
                className={classes.gridMarginSides}
              >
                <OverDueInvoiceCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default User;
