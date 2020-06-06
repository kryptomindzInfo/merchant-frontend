import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ErrorMessage, Field, Form, Formik } from 'formik';
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
import { login } from './utils/LoginAPI';
import { getUrlBasedOnType } from './utils/urlUtils';

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
  const [isLoading, setLoading] = React.useState(false);
  const { type, match } = props;
  const { name } = match.params;

  if (type === 'merchant') {
    localStorage.setItem(`${type}_name`, 'merchant');
  } else {
    localStorage.setItem(`${type}_name`, name);
  }

  const hrefBasedOnType = () =>
    setHref(getUrlBasedOnType(type, name, 'forgot-password'));

  useEffect(() => {
    hrefBasedOnType();
  });

  return (
    <Fragment>
      <Helmet>
        <title>{`${type.toUpperCase()} | Login`}</title>
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
          <LandingLeftSection type={type} />
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
              const loginCreds = {
                values,
                type,
              };
              setLoading(true);
              login(loginCreds);
              setLoading(false);
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
                    {isLoading ? <Loader /> : 'SIGN IN'}
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
