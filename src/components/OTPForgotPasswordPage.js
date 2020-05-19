import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import history from './utils/history';
import LandingLeftSection from './utils/LandingLeftSection';
import styles from '../assets/styles/LandingPageCss';

const initialValues = {
  otp: '',
};

const OTPForgotPasswordPage = (props) => {
  const classes = styles();
  // eslint-disable-next-line react/prop-types
  const { loginUrl, isBranch, branchLoginUrl, match } = props;
  const { branchName } = match.params;
  const formIk = useFormik({
    initialValues,
    onSubmit: (values) => {
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
      history.push('/merchant/login');
    },
  });

  return (
    <Fragment>
      <Helmet>
        <title>Merchant | OTP Forgot Password</title>
        <meta
          name="description"
          content="Description of Forgot Password page"
        />
      </Helmet>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item md={6} className={classes.setupPageLeftSide}>
          <LandingLeftSection isBranch={isBranch} branchName={branchName} />
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          className={classes.setupPageRightSide}
        >
          <Typography variant="h4" style={{ fontWeight: '600' }}>
            Enter OTP
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontSize: '14px',
              color: '#9ea0a5',
              paddingTop: '1%',
              paddingBottom: '7%',
            }}
          >
            Enter the OTP received on your Mobile Number
          </Typography>
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
    </Fragment>
  );
};

OTPForgotPasswordPage.propTypes = {
  loginUrl: PropTypes.string.isRequired,
  branchLoginUrl: PropTypes.string.isRequired,
  isBranch: PropTypes.bool.isRequired,
};

export default OTPForgotPasswordPage;
