import React, { Fragment, useState } from 'react';
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
import Loader from './shared/Loader';
import FormField from './shared/FormField';
import ErrorText from './shared/ErrorText';
import { inputBlur, inputFocus } from './utils/handleInputFocus';
import { signInVerify } from './utils/LoginAPI';

const initialValues = {
  newPassword: '',
  repeatPassword: '',
};
const validationSchema = Yup.object().shape({
  newPassword: Yup.mixed().required('Please enter the new password!'),
  repeatPassword: Yup.mixed()
    .when('newPassword', {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Passwords do not match',
      ),
    })
    .required('Please repeat the  new password!'),
});

const SignInVerificationPage = (props) => {
  const classes = styles();
  const { type } = props;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const name = localStorage.getItem(`${type}_name`);

  return (
    <Fragment>
      <Helmet>
        <title>
          {name === 'merchant'
            ? `${type.toUpperCase()} | Login Verification`
            : `${type.toUpperCase()} | ${name.toUpperCase()} | Login Verification`}
        </title>
        <meta name="description" content="Description of SignUp page" />
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
            Verify Account
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
            Enter your new password
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const payload = {
                type: props.type,
                password: values.newPassword,
                name,
              };
              signInVerify(payload, type);
            }}
          >
            {(formikProps) => {
              const { isSubmitting, handleBlur, handleChange } = formikProps;
              return (
                <Form>
                  <FormField mB="14px">
                    <label htmlFor="newPassword">New Password</label>
                    <Field
                      noMargin
                      name="newPassword"
                      type="password"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      as={TextInput}
                    />
                    <ErrorMessage name="newPassword" component={ErrorText} />
                  </FormField>
                  <FormField mB="14px">
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <Field
                      noMargin
                      name="repeatPassword"
                      type="password"
                      onFocus={(e) => {
                        handleChange(e);
                        inputFocus(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                        inputBlur(e);
                      }}
                      as={TextInput}
                    />
                    <ErrorMessage name="repeatPassword" component={ErrorText} />
                  </FormField>
                  <Button
                    filledBtn
                    variant="contained"
                    type="submit"
                    style={{ padding: '2%', marginTop: '5%' }}
                  >
                    {isSubmitting ? <Loader /> : 'SIGN IN'}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Fragment>
  );
};

SignInVerificationPage.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SignInVerificationPage;
