import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import axios from 'axios';
import history from './utils/history';
import LandingLeftSection from './shared/headers/LandingLeftSection';
import styles from '../styles/LandingPageCss';
import { MERCHANT_API } from './constants';
import notify from './utils/Notify';
import Button from './shared/Button';
import TextInput from './shared/TextInput';
import Loader from './shared/Loader';
import FormField from './shared/FormField';
import ErrorText from './shared/ErrorText';
import { inputBlur, inputFocus } from './utils/handleInputFocus';

const initialValues = {
  mobile: '',
};
const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .min(10, 'Minimum 10 digits required.')
    .max(10, 'Maximum 10 digits only.')
    .required('Required'),
});

const ForgotPasswordPage = (props) => {
  const classes = styles();
  // eslint-disable-next-line react/prop-types
  const { otpUrl, isBranch, branchOtpUrl, match } = props;
  const { branchName } = match.params;

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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
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
            }}
          >
            {(formikProps) => {
              const { isSubmitting, handleChange, handleBlur } = formikProps;
              return (
                <Form>
                  <FormField mB="14px">
                    <label htmlFor="mobile">Mobile No</label>
                    <Field
                      noMargin
                      name="mobile"
                      type="number"
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
                    <ErrorMessage name="mobile" component={ErrorText} />
                  </FormField>
                  <Button
                    filledBtn
                    variant="contained"
                    type="submit"
                    style={{ padding: '2%', marginTop: '5%' }}
                  >
                    {isSubmitting ? <Loader /> : 'Get OTP'}
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
ForgotPasswordPage.propTypes = {
  otpUrl: PropTypes.string.isRequired,
  branchOtpUrl: PropTypes.string.isRequired,
  isBranch: PropTypes.bool.isRequired,
};
export default ForgotPasswordPage;
