import React from 'react';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';

import appStore from '../../../assets/images/appStore.png';
import GooglePlayLogo from '../../../assets/images/GooglePlayLogo.png';

const styles = (theme) => ({
  mainContainer: {
    padding: '2%',
    textAlign: 'center',
  },
  cardDownloadOurAppTitle: {
    paddingTop: '4%',
    paddingBottom: '5%',
  },
  cardDownloadOurAppSubitle: {
    padding: '5%',
    paddingTop: '0',
  },
  appStoreLogo: {
    padding: '5%',
    width: '150px',
  },
});

function DownloadAppCard(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;
  return (
    <div>
      <Paper elevation={1}>
        <Grid container className={classes.mainContainer}>
          <Grid item md={12} sm={12} xs={12}>
            <Typography
              className={classes.cardDownloadOurAppTitle}
              variant="h4"
            >
              Download Our App
            </Typography>
            <Typography
              className={classes.cardDownloadOurAppSubitle}
              variant="h6"
            >
              Send & receive money through your mobile
            </Typography>
            <img className={classes.appStoreLogo} src={appStore} alt={{}} />

            <img
              className={classes.appStoreLogo}
              src={GooglePlayLogo}
              alt={{}}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(DownloadAppCard);
