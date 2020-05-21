import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Send, Receipt } from '@material-ui/icons';

const styles = (theme) => ({
  mainContainer: {
    padding: '10%',
    borderRadius: '10px',
    background: 'white',
  },
  cardEwalletTitle: {
    paddingTop: '5%',
    paddingBottom: '5%',
    fontWeight: 600,
    width: '60%',
    fontSize: '32px',
    textWrap: 'none',
  },
  cardEwalletCurrency: {
    fontWeight: 600,
    paddingTop: '2%',
  },

  eWalletTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBankTitle: {
    paddingTop: '3%',
    fontSize: '12px',
    wordBreak: 'break-word',
  },
  cardButton: {
    padding: '3%',
  },
});
const EWalletBalanceSendAndClaimMoneyCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;
  return (
    <div>
      <Paper elevation={1}>
        <Grid container className={classes.mainContainer}>
          <Grid item md={12} xs={12} sm={12}>
            <div className={classes.eWalletTitle}>
              <span className={classes.cardEwalletTitle}>E-WALLET</span>
              <span className={classes.cardBankTitle}>Powered by ICICI</span>
            </div>
            <Typography variant="subtitle2">Available:</Typography>
            <Typography className={classes.cardEwalletCurrency} variant="h4">
              XOF 500
            </Typography>
            <Grid container style={{ paddingTop: '10%' }}>
              <Grid xs={6} md={6} item>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    paddingBottom: '3%',
                    paddingTop: '3%',
                  }}
                  onClick={() => {}}
                  startIcon={
                    <Icon fontSize="inherit">
                      <Send />
                    </Icon>
                  }
                >
                  <Typography variant="button" noWrap>
                    Send Money
                  </Typography>
                </Button>
              </Grid>
              <Grid xs={6} md={6} item>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    paddingBottom: '3%',
                    paddingTop: '3%',
                  }}
                  onClick={() => {}}
                  startIcon={
                    <Icon fontSize="inherit">
                      <Receipt />
                    </Icon>
                  }
                >
                  <Typography variant="button" noWrap>
                    Claim Money
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(EWalletBalanceSendAndClaimMoneyCard);
