import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import history from './utils/history';
import LandingLeftSection from './utils/LandingLeftSection';
import styles from '../styles/LandingPageCss';
import { MERCHANT_API } from './constants';
import notify from './utils/Notify';

const initialValues = {
  mobile: '',
};
const validationSchema = Yup.object().shape({
  mobile: Yup.number().required('Required'),
});

const ForgotPasswordPage = (props) => {
  const classes = styles();
  // eslint-disable-next-line react/prop-types
  const { otpUrl, isBranch, branchOtpUrl, match } = props;
  const { branchName } = match.params;
  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      values.user_type = 'merchant';
      axios
        .post(`${MERCHANT_API}/common/forgotPassword`, values)
        .then((res) => {
          if (res.data.status === 1) {
            if (res.data.error) {
              notify(res.data.error, 'error');
            } else {
              history.push(otpUrl, { mobile: values.mobile });
            }
          }
        })
        .catch((error) => {
          notify('Something Went Wrong', 'error');
        });
    },
  });

  return (
    <Fragment>
      <Helmet>
        <title>Merchant | Forgot Password</title>
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
            Forgot Password
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
            Use your Mobile number to get OTP
          </Typography>
          <form onSubmit={formIk.handleSubmit}>
            <TextField
              label="Mobile Number"
              placeholder="Mobile Number"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="mobile"
              value={formIk.values.mobile}
              onChange={formIk.handleChange}
              onBlur={formIk.handleBlur}
              error={formIk.errors.mobile && formIk.touched.mobile}
              helperText={
                formIk.errors.mobile && formIk.touched.mobile
                  ? formIk.errors.mobile
                  : ''
              }
            />

            <Button
              variant="contained"
              type="submit"
              disabled={formIk.isSubmitting}
              className={classes.signInButton}
            >
              GET OTP
            </Button>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};
ForgotPasswordPage.propTypes = {
  otpUrl: PropTypes.string.isRequired,
  branchOtpUrl: PropTypes.string.isRequired,
  isBranch: PropTypes.bool.isRequired,
};
export default ForgotPasswordPage;
