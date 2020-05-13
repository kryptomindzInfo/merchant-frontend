import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import history from './utils/history';
import LandingLeftSection from './utils/LandingLeftSection';
import styles from '../styles/LandingPageCss';

// const styles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   setupPageLeftSide: {
//     background: theme.palette.vGradient,
//     height: '100vh',
//     overflow: 'hidden',
//     [theme.breakpoints.down('sm')]: {
//       display: 'none',
//     },
//     [theme.breakpoints.down('xs')]: {
//       display: 'none',
//     },
//   },
//   setupPageRightSide: {
//     marginTop: '5%',
//     paddingLeft: '10%',
//     overflow: 'hidden',
//
//     [theme.breakpoints.down('sm')]: {
//       paddingLeft: '20%',
//     },
//     [theme.breakpoints.down('sm')]: {
//       paddingLeft: '14%',
//     },
//   },
//   textField: {
//     // marginLeft: theme.spacing.unit,
//     marginBottom: '0.03375rem',
//     width: '70%',
//   },
//   signInButton: {
//     background: theme.palette.primary.main,
//     marginTop: '7%',
//     padding: '0px',
//     fontSize: '24px',
//     color: theme.palette.white,
//     width: '70%',
//     '&:hover': {
//       background: theme.palette.primary.hover,
//     },
//   },
// }));
const initialValues = {
  username: '',
  password: '',
};
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

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
  history.push('/sign-in-verify');
};
const SignInPage = (props) => {
  const classes = styles();
  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <Fragment>
      <Helmet>
        <title>Merchant | Sign In</title>
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
          <form onSubmit={formIk.handleSubmit}>
            <TextField
              error={formIk.errors.username && formIk.touched.username}
              label="Mobile Number"
              placeholder="Mobile Number"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="username"
              value={formIk.values.username}
              onChange={formIk.handleChange}
              onBlur={formIk.handleBlur}
              helperText={
                formIk.errors.username && formIk.touched.username
                  ? formIk.errors.username
                  : ''
              }
            />
            <TextField
              error={formIk.errors.password && formIk.touched.password}
              name="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={formIk.values.password}
              onChange={formIk.handleChange}
              onBlur={formIk.handleBlur}
              helperText={
                formIk.errors.password && formIk.touched.password
                  ? formIk.errors.password
                  : ''
              }
            />
            <Button
              variant="contained"
              type="submit"
              disabled={formIk.isSubmitting}
              className={classes.signInButton}
            >
              SIGN IN
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
                      fontWeightBold: '900',
                      fontSize: '14px',
                      paddingTop: '5%',
                      fontWeight: '600',
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

export default SignInPage;
