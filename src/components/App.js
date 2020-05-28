import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';
import { Route, Router, Switch } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import { ThemeProvider } from 'styled-components';
import WebFont from 'webfontloader';
import SignInPage from './SignInPage';
import SignInVerificationPage from './SignInVerificationPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import OTPForgotPasswordPage from './OTPForgotPasswordPage';
import history from './utils/history';
import Dashboard from './merchant/dashboard/Dashboard';
import StaffList from './merchant/staff/StaffList';
import BranchList from './merchant/branch/BranchList';
import BranchInfo from './merchant/branch/BranchInfo';
import GlobalStyle from '../styles/global-styles';
import CashierList from './branch/cashier/CashierList';
import CashierInfo from './branch/cashier/CashierInfo';
import BranchSettings from './branch/settings/BranchSettings';

WebFont.load({ google: { families: ['Roboto: 200,300,400,500'] } });

const appTheme = {
  primary: '#417505',
  // primary: "#ff0000",
  // secondary: "#ff0000",
  secondary: '#6cac69',
  accent: '#f5a623',
  danger: '#f52828',
  light: '#9ea0a5',
  greyLine: '#666565 ',
  vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
  hGradient: 'linear-gradient(to right, #6cac6a 1%, #102910)',
  font: 'Roboto',
  fontSize: '14px',
  background: '#f5f5f5',
};

const muiTheme = createMuiTheme({
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

// merchant URL's

const merchantDashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/login-verify';
const loginUrl = '/merchant/login';
const otpUrl = '/merchant/otp-forgot-password';
const branchUrl = '/merchant/branches';
const staffUrl = '/merchant/staff';
const branchLoginUrl = '/merchant/branch/:branchName';
const branchProfileUrl = '/merchant/branch/info/:id';

// branch URL's
const cashierUrl = '/branch/cashiers';
const branchDashboardUrl = '/branch/:branchName/dashboard';
const branchSettingsUrl = '/branch/settings';
const cashierInfoUrl = '/branch/cashier/info/:id';

function App() {
  const [theme, setTheme] = useState(appTheme);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router history={history} forceRefresh="true" basename="/">
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <SignInPage
                  isBranch={false}
                  verifyUrl={verifyUrl}
                  dashboardUrl={merchantDashboardUrl}
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
                  dashboardUrl={merchantDashboardUrl}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={verifyUrl}
              component={(props) => (
                <SignInVerificationPage
                  dashboardUrl={merchantDashboardUrl}
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
              path={merchantDashboardUrl}
              component={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path={branchUrl}
              component={(props) => <BranchList {...props} />}
            />
            <Route
              exact
              path={branchProfileUrl}
              component={(props) => <BranchInfo {...props} />}
            />
            <Route
              exact
              path={staffUrl}
              component={(props) => <StaffList {...props} />}
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

            <Route
              exact
              path={cashierUrl}
              component={(props) => <CashierList {...props} />}
            />
            <Route
              exact
              path={cashierInfoUrl}
              component={(props) => <CashierInfo {...props} />}
            />
            <Route
              exact
              path={branchSettingsUrl}
              component={(props) => <BranchSettings {...props} />}
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
          <GlobalStyle />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
