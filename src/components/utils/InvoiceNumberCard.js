import React from 'react';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import { Typography, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  mainContainer: {
    padding: '10%',
    textAlign: 'flex-start',
  },
  cardEwalletCurrency: {
    fontWeight: 600,
    paddingTop: '2%',
  },
}));

const InvoiceNumberCard = () => {
  const classes = styles();
  return (
    <div>
      <Paper elevation={1}>
        <Grid container className={classes.mainContainer}>
          <Grid item md={12} xs={12} sm={12}>
            <Typography variant="body1" noWrap>
              No of Invoice paid
            </Typography>
            <Typography className={classes.cardEwalletCurrency} variant="h4">
              552
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default InvoiceNumberCard;
