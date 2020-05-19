import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import locale from 'yup/lib/locale';

const styles = makeStyles((theme) => ({
  setupPageTitle: {
    color: theme.palette.white,
    margin: '0 auto',
    textAlign: 'center',
    paddingBottom: '7%',
    fontWeight: '600',
  },
  setupPageLogo: {
    color: '#fff',
    border: '2px solid #fff',
    marginTop: '27%',
    margin: '0 auto',
    marginBottom: '2%',
    height: '130px',
    width: '130px',
    background: 'transparent',
  },
  setupPageSubtitle2: {
    color: theme.palette.white,
    textAlign: 'center',
    display: 'inline-block',
    width: '79%',
    margin: '0 auto',
  },
}));

const LandingLeftSection = (props) => {
  const classes = styles();
  const { branchName, isBranch } = props;
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Avatar alt="bank logo" src="" className={classes.setupPageLogo}>
          <Typography style={{ fontWeight: 'bold', fontSize: '23px' }}>
            {isBranch
              ? branchName.toLocaleUpperCase(locale.default)
              : 'Merchant'}
          </Typography>
        </Avatar>
        <Typography className={classes.setupPageTitle} variant="h1">
          E-WALLET
        </Typography>
        <Typography variant="h5" className={classes.setupPageSubtitle2}>
          Welcome to E-wallet <br />
          Create your wallet for easy transferring <br />
          of money to your friends and family
        </Typography>
      </Grid>
    </div>
  );
};
LandingLeftSection.propTypes = {
  branchName: PropTypes.string,
  isBranch: PropTypes.bool.isRequired,
};
LandingLeftSection.defaultProps = {
  branchName: 'Merchant',
};
export default LandingLeftSection;
