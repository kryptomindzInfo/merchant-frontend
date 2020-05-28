import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import axios from 'axios';
import history from './utils/history';
import LandingLeftSection from './utils/LandingLeftSection';
import styles from '../styles/LandingPageCss';
import { MERCHANT_API } from './constants';
import notify from './utils/Notify';
import Button from './shared/Button';
import TextInput from './shared/TextInput';
import A from './shared/A';
import Loader from './shared/Loader';
import FormField from './shared/FormField';
import ErrorText from './shared/ErrorText';
import { inputBlur, inputFocus } from './utils/handleInputFocus';

const initialValues = {
  otp: '',
};

const OTPForgotPasswordPage = (props) => {
  const classes = styles();
  // eslint-disable-next-line react/prop-types
  const { loginUrl, isBranch, branchLoginUrl, match } = props;
  const { branchName } = match.params;

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
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              values.mobile = props.location.state.mobile;
              values.user_type = 'merchant';
              axios
                .post(`${MERCHANT_API}/common/verifyForgotPasswordOTP`, values)
                .then((res) => {
                  if (res.data.status === 1) {
                    if (res.data.error) {
                      notify(res.data.error, 'error');
                    } else {
                      history.push(loginUrl);
                    }
                  }
                })
                .catch((error) => {
                  notify('Something Went Wrong', 'error');
                });
              history.push('/merchant/login');
            }}
          >
            {(formikProps) => {
              const { isSubmitting } = formikProps;
              return (
                <Form>
                  <FormField mB="14%">
                    <label htmlFor="otp">OTP</label>
                    <Field
                      noMargin
                      name="otp"
                      type="text"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      as={TextInput}
                    />
                    <ErrorMessage name="username" component={ErrorText} />
                  </FormField>{' '}
                  <Button
                    filledBtn
                    variant="contained"
                    type="submit"
                    style={{ padding: '2%', marginTop: '5%' }}
                  >
                    {isSubmitting ? <Loader /> : 'SUBMIT'}
                  </Button>
                  <Grid container>
                    <Grid item md={6} sm={12} xs={12}>
                      <Typography
                        style={{
                          fontSize: '14px',
                          paddingTop: '5%',
                          // textAlign: 'end'
                          // paddingLeft: '5%',
                        }}
                      >
                        <A href="/merchant/forgot-password">Forgot password?</A>
                      </Typography>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
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
