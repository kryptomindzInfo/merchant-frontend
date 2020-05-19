import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import SignInPage from './SignInPage';
import SignInVerificationPage from './SignInVerificationPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import OTPForgotPasswordPage from './OTPForgotPasswordPage';
import history from './utils/history';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#417505',
      hover: '#264503',
    },
    // secondary: '#6cac69',
    // accent: '#f5a623',
    // light: '#9ea0a5',
    // greyLine: '#666565 ',
    white: 'white',
    main: '#417505',
    vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
    hGradient: 'linear-gradient(to right, #6cac6a 1%, #102910)',
    font: 'Roboto',
    fontSize: '14px',
  },
  status: {
    danger: orange,
  },
  typography: {
    color: 'white',
    fontFamily: ['Roboto', 'sans-serif'].join(),
  },
});

const dashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/login-verify';
const loginUrl = '/merchant/login';
const otpUrl = '/merchant/otp-forgot-password';
// branch URL's
const branchLoginUrl = '/merchant/branch/:branchName';
const branchDashboardUrl = '/merchant/branch/:branchName/dashboard';
// const branchVerifyUrl = '/merchant/branch/login-verify';
const branchOtpUrl = '/merchant/branch/otp-forgot-password';

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Router history={history} forceRefresh="true" basename="/">
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <SignInPage
                  isBranch="false"
                  verifyUrl={verifyUrl}
                  dashboardUrl={dashboardUrl}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={loginUrl}
              component={(props) => (
                <SignInPage
                  isBranch={false}
                  verifyUrl={verifyUrl}
                  dashboardUrl={dashboardUrl}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={verifyUrl}
              component={(props) => (
                <SignInVerificationPage
                  dashboardUrl={dashboardUrl}
                  loginUrl={loginUrl}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/merchant/forgot-password"
              component={(props) => (
                <ForgotPasswordPage
                  isBranch={false}
                  otpUrl={otpUrl}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={otpUrl}
              component={(props) => (
                <OTPForgotPasswordPage
                  isBranch={false}
                  loginUrl={loginUrl}
                  branchLoginUrl={branchLoginUrl}
                  {...props}
                />
              )}
            />
            {/* Branch Routes */}
            <Route
              exact
              path={branchLoginUrl}
              component={(props) => (
                <SignInPage
                  isBranch
                  verifyUrl=""
                  dashboardUrl={branchDashboardUrl}
                  {...props}
                />
              )}
            />
            {/* <Route */}
            {/*  exact */}
            {/*  path={branchVerifyUrl} */}
            {/*  component={(props) => ( */}
            {/*    <SignInVerificationPage */}
            {/*      loginUrl={branchLoginUrl} */}
            {/*      dashboardUrl={branchDashboardUrl} */}
            {/*      {...props} */}
            {/*    /> */}
            {/*  )} */}
            {/* /> */}
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
