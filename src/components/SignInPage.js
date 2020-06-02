import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import LandingLeftSection from './shared/LandingLeftSection';
import styles from '../styles/LandingPageCss';
import Button from './shared/Button';
import TextInput from './shared/TextInput';
import A from './shared/A';
import Loader from './shared/Loader';
import FormField from './shared/FormField';
import ErrorText from './shared/ErrorText';
import { inputBlur, inputFocus } from './utils/handleInputFocus';

const initialValues = {
  username: '',
  password: '',
};
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const SignInPage = (props) => {
  const classes = styles();
  const [href, setHref] = React.useState('/merchant/forgot-password');
  const { type, match } = props;
  const { branchName } = match.params;

  const hrefBasedOnType = () => {
    switch (type) {
      case 'merchant':
        setHref('/merchant/forgot-password');
        break;
      case 'branch':
        setHref(`/branch/${branchName}/forgot-password`);
        break;
      case 'cashier':
        setHref(`/cashier/${branchName}/forgot-password`);
        break;
      default:
        setHref('/merchant/forgot-password');
        break;
    }
  };

  useEffect(() => hrefBasedOnType());

  return (
    <Fragment>
      <Helmet>
        <title>Merchant | Login In</title>
        <meta name="description" content="Description of SignIn Page" />
      </Helmet>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item md={6} className={classes.setupPageLeftSide}>
          <LandingLeftSection branchName={branchName} />
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          className={classes.setupPageRightSide}
        >
          <Typography variant="h4" style={{ fontWeight: '600' }}>
            Login to your account
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
            Use your Mobile number to Login
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // axios
              //   .post(`${MERCHANT_API}/login`, values)
              //   .then((res) => {
              //     if (res.status === 200) {
              //       if (res.data.status === 0) {
              //         notify(res.data.error, 'error');
              //       } else if (res.data.details.status === 1) {
              //         history.push(verifyUrl);
              //       } else {
              //         localStorage.setItem(
              //           'merchantLogged',
              //           res.data.details.token,
              //         );
              //         history.push(dashboardUrl);
              //       }
              //     }
              //   })
              //   .catch((error) => {
              //     notify('Something Went Wrong', 'error');
              //   });
              // history.push(verifyUrl);
            }}
          >
            {(formikProps) => {
              const { isSubmitting, handleBlur, handleChange } = formikProps;
              return (
                <Form>
                  <FormField mB="14px">
                    <label htmlFor="username">Username</label>
                    <Field
                      onFocus={(e) => {
                        handleChange(e);
                        inputFocus(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                        inputBlur(e);
                      }}
                      noMargin
                      name="username"
                      type="text"
                      as={TextInput}
                    />
                    <ErrorMessage name="username" component={ErrorText} />
                  </FormField>
                  <FormField mB="14px">
                    <label htmlFor="password">Password</label>
                    <Field
                      onFocus={(e) => {
                        handleChange(e);
                        inputFocus(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                        inputBlur(e);
                      }}
                      noMargin
                      name="password"
                      type="password"
                      as={TextInput}
                    />
                    <ErrorMessage name="password" component={ErrorText} />
                  </FormField>
                  <Button
                    filledBtn
                    variant="contained"
                    type="submit"
                    style={{ padding: '2%', marginTop: '5%' }}
                  >
                    {isSubmitting ? <Loader /> : 'SIGN IN'}
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
                        <A href={href}>Forgot password?</A>
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

SignInPage.propTypes = {
  type: PropTypes.string.isRequired,
};
export default SignInPage;
