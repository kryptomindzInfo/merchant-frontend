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
import BranchDashboard from './branch/dashboard/BranchDashboard';
import CashierDashboard from './cashier/dashboard/CashierDashboard';

import InvoiceList from './cashier/invoice/InvoiceList';
import ProtectedRoute from './ProtectedRoute';
import {
  branchCashiersUrl,
  branchDashboardUrl,
  branchForgotPasswordUrl,
  branchLoginUrl,
  branchOtpUrl,
  branchProfileUrl,
  branchSettingsUrl,
  branchUrl,
  branchVerifyUrl,
  cashierDashboardUrl,
  cashierForgotPasswordUrl,
  cashierInfoUrl,
  cashierLoginUrl,
  cashierOtpUrl,
  defaultBranchLoginUrl,
  defaultCashierLoginUrl,
  forgotPasswordUrl,
  invoiceUrl,
  loginUrl,
  merchantDashboardUrl,
  merchantSettingsUrl,
  otpUrl,
  staffUrl,
  verifyUrl,
} from './Url';
import PrivateRoute from './PrivateRoute';
import MerchantSettings from './merchant/settings/MerchantSettings';

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

function App() {
  const [theme, setTheme] = useState(appTheme);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router history={history} forceRefresh="true" basename="/">
          <Switch>
            {/* Default Route */}
            <Route
              exact
              path="/"
              component={(props) => <SignInPage type="merchant" {...props} />}
            />
            {/* =============== */}
            {/* Merchant Routes */}
            {/* =============== */}
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantDashboardUrl}
              component={(props) => <Dashboard {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={branchUrl}
              component={(props) => <BranchList {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={branchProfileUrl}
              component={(props) => <BranchInfo {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={staffUrl}
              component={(props) => <StaffList {...props} />}
            />
            {/* ====================== */}
            {/* Merchant Public Routes */}
            {/* ====================== */}
            <Route
              exact
              path={loginUrl}
              component={(props) => <SignInPage type="merchant" {...props} />}
            />
            <ProtectedRoute
              exact
              type="merchant"
              path={verifyUrl}
              component={(props) => (
                <SignInVerificationPage type="merchant" {...props} />
              )}
            />
            <Route
              exact
              path={forgotPasswordUrl}
              component={(props) => (
                <ForgotPasswordPage type="merchant" {...props} />
              )}
            />
            <PrivateRoute
              exact
              type="merchant"
              path={otpUrl}
              component={(props) => <OTPForgotPasswordPage {...props} />}
            />
            <ProtectedRoute
              exact
              type="merchant"
              path={merchantSettingsUrl}
              component={(props) => <MerchantSettings {...props} />}
            />
            {/* ============= */}
            {/* Branch Routes */}
            {/* ============= */}
            <ProtectedRoute
              type="branch"
              exact
              path={branchDashboardUrl}
              component={(props) => <BranchDashboard {...props} />}
            />
            <ProtectedRoute
              type="branch"
              exact
              path={branchCashiersUrl}
              component={(props) => <CashierList {...props} />}
            />
            <ProtectedRoute
              type="branch"
              exact
              path={cashierInfoUrl}
              component={(props) => <CashierInfo {...props} />}
            />
            <ProtectedRoute
              type="branch"
              exact
              path={branchSettingsUrl}
              component={(props) => <BranchSettings {...props} />}
            />
            <ProtectedRoute
              exact
              type="branch"
              path={branchVerifyUrl}
              component={(props) => (
                <SignInVerificationPage type="branch" {...props} />
              )}
            />
            {/* ==================== */}
            {/* Branch public Routes */}
            {/* ==================== */}
            <Route
              exact
              path={defaultBranchLoginUrl}
              component={(props) => <SignInPage type="branch" {...props} />}
            />
            <Route
              exact
              path={branchLoginUrl}
              component={(props) => <SignInPage type="branch" {...props} />}
            />
            <Route
              exact
              path={branchForgotPasswordUrl}
              component={(props) => (
                <ForgotPasswordPage type="branch" {...props} />
              )}
            />
            <PrivateRoute
              type="branch"
              exact
              path={branchOtpUrl}
              component={(props) => <OTPForgotPasswordPage {...props} />}
            />
            {/* ============== */}
            {/* Cashier Routes */}
            {/* ============== */}
            <Route
              type="cashier"
              exact
              path={cashierDashboardUrl}
              component={(props) => <CashierDashboard {...props} />}
            />
            <Route
              type="cashier"
              exact
              path={invoiceUrl}
              component={(props) => <InvoiceList {...props} />}
            />
            {/* ===================== */}
            {/* Cashier Public Routes */}
            {/* ===================== */}
            <Route
              exact
              path={defaultCashierLoginUrl}
              component={(props) => <SignInPage type="cashier" {...props} />}
            />
            <Route
              exact
              path={cashierLoginUrl}
              component={(props) => <SignInPage type="cashier" {...props} />}
            />
            <Route
              exact
              path={cashierForgotPasswordUrl}
              component={(props) => (
                <ForgotPasswordPage type="cashier" {...props} />
              )}
            />
            <PrivateRoute
              exact
              type="cashier"
              path={cashierOtpUrl}
              component={(props) => <OTPForgotPasswordPage {...props} />}
            />
          </Switch>
          <GlobalStyle />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
