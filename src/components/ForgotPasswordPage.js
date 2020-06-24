import React, { Fragment } from 'react';
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
import { forgotPassword } from './utils/ForgotPasswordAPI';

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
  const { type, match } = props;
  const { name } = match.params;
  const [isLoading, setLoading] = React.useState(false);

  if (type === 'merchant') {
    localStorage.setItem(`${type}_name`, 'merchant');
  } else {
    localStorage.setItem(`${type}_name`, name);
  }

  return (
    <Fragment>
      <Helmet>
        <title>`${type.toUpperCase()} | Forgot Password | E-WALLET`</title>
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
              const body = { ...values, user_type: type };
              setLoading(true);
              forgotPassword(type, body);
              setLoading(false);
            }}
          >
            {(formikProps) => {
              const { handleChange, handleBlur } = formikProps;
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
                    {isLoading ? <Loader /> : 'Get OTP'}
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
  type: PropTypes.string.isRequired,
};
export default ForgotPasswordPage;
