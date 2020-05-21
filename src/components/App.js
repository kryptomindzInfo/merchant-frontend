import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import SignInPage from './SignInPage';
import SignInVerificationPage from './SignInVerificationPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import OTPForgotPasswordPage from './OTPForgotPasswordPage';
import history from './utils/history';
import Dashboard from './dashboard/Dashboard';
import Branch from './branch/Branch';
import User from './user/User';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#417505',
      hover: '#264503',
    },
    white: 'white',
    main: '#417505',
    vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
    hGradient: 'linear-gradient(to right, #6cac6a 1%, #102910)',
    fontSize: '14px',
  },
  status: {
    danger: orange,
  },
  typography: {
    color: 'white',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(),
  },
});

const dashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/login-verify';
const loginUrl = '/merchant/login';
const otpUrl = '/merchant/otp-forgot-password';
const branchUrl = '/merchant/branch';
const userUrl = '/merchant/user';
// branch URL's
const branchLoginUrl = '/merchant/branch/:branchName';
const branchDashboardUrl = '/merchant/branch/:branchName/dashboard';

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
            <Route
              exact
              path={dashboardUrl}
              component={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path={branchUrl}
              component={(props) => <Branch {...props} />}
            />
            <Route
              exact
              path={userUrl}
              component={(props) => <User {...props} />}
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
