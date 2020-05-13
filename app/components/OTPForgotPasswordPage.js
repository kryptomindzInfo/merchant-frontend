import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import history from '../history';
import LandingLeftSection from './utils/LandingLeftSection';


const styles = makeStyles(theme => ({
  setupPageLeftSide: {
    background: theme.palette.vGradient,
    height: '100vh',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  setupPageRightSide: {
    paddingLeft: '10%',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '14%',
    },
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    marginBottom: '0.03375rem',
    width: '70%',
    // height: '45px'
  },
  signInButton: {
    // margin: theme.spacing.unit,
    background: theme.palette.primary.main,
    // marginLeft: theme.spacing.unit,
    marginTop: '10%',
    color: theme.palette.white,
    fontSize: '16px',
    width: '70%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },

}));

const initialValues = {
  otp: '',
};


const onSubmit = (values) => {
  // axios.post('', values)
  //   .then(res => {
  //     if (res.data.status === 1) {
  //       if (res.data.error) {
  //         notify(res.data.error, 'error');
  //       } else {
  //         // todo:
  //       }
  //     }
  //   })
  //   .catch(error => {
  //     notify('Something Went Wrong', 'error');
  //   });
  history.push('/otp-forgot-password');
};
const SignInVerificationPage = props => {
  const classes = styles();
  const formIk = useFormik({
    initialValues,
    onSubmit
  });

  return (<Fragment>
    <Helmet>
      <title>Merchant | OTP Forgot Password</title>
      <meta name="description" content="Description of Forgot Password page" />
    </Helmet>
    <Grid
      container
      direction="row"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid item md={6} className={classes.setupPageLeftSide}>
        <LandingLeftSection />
      </Grid>
      <Grid
        item
        md={6}
        sm={12}
        xs={12}
        className={classes.setupPageRightSide}
      >
        <Typography variant="h4" style={{ paddingBottom: '5%', fontWeight: '600' }}>Enter OTP</Typography>
        <form onSubmit={formIk.handleSubmit}>
          <TextField
            label="OTP"
            placeholder="OTP"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            name="otp"
            value={formIk.values.otp}
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={formIk.isSubmitting}
            className={classes.signInButton}
          >
            SUBMIT
          </Button>
        </form>
      </Grid>
    </Grid>
          </Fragment>);
};

export default (SignInVerificationPage);
