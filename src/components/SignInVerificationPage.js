import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LandingLeftSection from './utils/LandingLeftSection';
import history from './utils/history';
import styles from '../assets/styles/LandingPageCss';

const initialValues = {
  newPassword: '',
  repeatPassword: '',
};
const validationSchema = Yup.object().shape({
  newPassword: Yup.mixed().required('Please enter the new password!'),
  repeatPassword: Yup.mixed().when('newPassword', {
    is: (val) => !!(val && val.length > 0),
    then: Yup.string().oneOf(
      [Yup.ref('newPassword')],
      'Passwords do not match',
    ),
  }),
});

// eslint-disable-next-line no-unused-vars
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
  history.push('/sign-in');
};
const SignInVerificationPage = (props) => {
  const classes = styles();
  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  return (
    <Fragment>
      <Helmet>
        <title>Merchant | Sign In Verification</title>
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
          <LandingLeftSection />
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
          <form onSubmit={formIk.handleSubmit}>
            <TextField
              id="newPassword"
              label="New Password"
              name="newPassword"
              margin="normal"
              variant="outlined"
              className={classes.textField}
              type={showNewPassword ? 'text' : 'password'}
              value={formIk.values.newPassword}
              onChange={formIk.handleChange}
              error={formIk.errors.newPassword && formIk.touched.newPassword}
              helperText={
                formIk.errors.newPassword && formIk.touched.newPassword
                  ? formIk.errors.newPassword
                  : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="repeatPassword"
              label="Repeat Password"
              name="repeatPassword"
              margin="normal"
              variant="outlined"
              className={classes.textField}
              type={showNewPassword ? 'text' : 'password'}
              value={formIk.values.repeatPassword}
              onChange={formIk.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="toggle password visibility"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      edge="end"
                    >
                      {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                formIk.errors.repeatPassword && formIk.touched.repeatPassword
              }
              helperText={
                formIk.errors.repeatPassword && formIk.touched.repeatPassword
                  ? formIk.errors.repeatPassword
                  : ''
              }
            />
            <Button
              variant="contained"
              type="submit"
              disabled={formIk.isSubmitting}
              className={classes.signInButton}
            >
              SUBMIT
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
                  <Link
                    color="primary"
                    style={{
                      fontWeight: '600',
                      fontSize: '14px',
                      paddingTop: '5%',
                    }}
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SignInVerificationPage;
