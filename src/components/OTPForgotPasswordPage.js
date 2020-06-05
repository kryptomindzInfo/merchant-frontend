import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import LandingLeftSection from './shared/LandingLeftSection';
import styles from '../styles/LandingPageCss';
import Button from './shared/Button';
import TextInput from './shared/TextInput';
import Loader from './shared/Loader';
import FormField from './shared/FormField';
import ErrorText from './shared/ErrorText';
import { inputBlur, inputFocus } from './utils/handleInputFocus';
import { verifyOTP } from './utils/ForgotPasswordAPI';

const initialValues = {
  otp: '',
};

const validationSchema = Yup.object().shape({
  otp: Yup.number().required('Required'),
});

const OTPForgotPasswordPage = (props) => {
  const classes = styles();
  const { type, match } = props;
  const { name } = match.params;
  const [isLoading, setLoading] = React.useState(false);

  return (
    <Fragment>
      <Helmet>
        <title>{type.toUpperCase()} | OTP Forgot Password</title>
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
          <LandingLeftSection name={name} />
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
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const body = { ...values, user_type: type };
              setLoading(true);
              verifyOTP(type, name, body);
              setLoading(false);
            }}
          >
            {(formikProps) => {
              return (
                <Form>
                  <FormField mB="14px">
                    <label htmlFor="otp">OTP</label>
                    <Field
                      noMargin
                      name="otp"
                      type="number"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      as={TextInput}
                    />
                    <ErrorMessage name="otp" component={ErrorText} />
                  </FormField>
                  <Button
                    filledBtn
                    variant="contained"
                    type="submit"
                    style={{ padding: '2%', marginTop: '5%' }}
                  >
                    {isLoading ? <Loader /> : 'SUBMIT'}
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

OTPForgotPasswordPage.propTypes = {
  type: PropTypes.string.isRequired,
};

export default OTPForgotPasswordPage;
