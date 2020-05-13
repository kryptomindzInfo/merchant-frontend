import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  setupPageTitle: {
    color: theme.palette.white,
    margin: '0 auto',
    textAlign: 'center',
    paddingBottom: '7%',
    fontWeight: '600',
  },
  setupPageLogo: {
    marginTop: '27%',
    margin: '0 auto',
    marginBottom: '2%',
    height: '150px',
    width: '150px',
    background: '#173316',
  },
  setupPageSubtitle2: {
    color: theme.palette.white,
    textAlign: 'center',
    display: 'inline-block',
    width: '79%',
    margin: '0 auto',
  },
}));

function LandingLeftSection() {
  const classes = styles();
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Avatar
          alt="bank logo"
          onClick={() => {}}
          className={classes.setupPageLogo}
        />
        <Typography className={classes.setupPageTitle} variant="h1">
          E-WALLET
        </Typography>
        <Typography variant="h5" className={classes.setupPageSubtitle2}>
          Welcome to E-wallet <br />
          Create your wallet for easy transfering <br />
          of money to your friends and family
        </Typography>
      </Grid>
    </div>
  );
}

export default LandingLeftSection;
