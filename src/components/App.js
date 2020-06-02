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
import URL from './Url';
import InvoiceList from './cashier/invoice/InvoiceList';
import ProtectedRoute from './ProtectedRoute';

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
            <Route
              userType="merchant"
              exact
              path={URL.merchantDashboardUrl}
              component={(props) => <Dashboard {...props} />}
            />
            <Route
              userType="merchant"
              exact
              path={URL.branchUrl}
              component={(props) => <BranchList {...props} />}
            />
            <Route
              userType="merchant"
              exact
              path={URL.branchProfileUrl}
              component={(props) => <BranchInfo {...props} />}
            />
            <Route
              userType="merchant"
              exact
              path={URL.staffUrl}
              component={(props) => <StaffList {...props} />}
            />
            {/* ====================== */}
            {/* Merchant Public Routes */}
            {/* ====================== */}
            <Route
              exact
              path={URL.loginUrl}
              component={(props) => <SignInPage type="merchant" {...props} />}
            />
            <Route
              exact
              path={URL.verifyUrl}
              component={(props) => (
                <SignInVerificationPage type="merchant" {...props} />
              )}
            />
            <Route
              exact
              path={URL.forgotPasswordUrl}
              component={(props) => (
                <ForgotPasswordPage type="merchant" {...props} />
              )}
            />
            <Route
              exact
              path={URL.otpUrl}
              component={(props) => (
                <OTPForgotPasswordPage type="merchant" {...props} />
              )}
            />
            {/* ============= */}
            {/* Branch Routes */}
            {/* ============= */}
            <Route
              userType="branch"
              exact
              path={URL.branchDashboardUrl}
              component={(props) => <BranchDashboard {...props} />}
            />
            <Route
              userType="branch"
              exact
              path={URL.branchCashiersUrl}
              component={(props) => <CashierList {...props} />}
            />
            <Route
              userType="branch"
              exact
              path={URL.cashierInfoUrl}
              component={(props) => <CashierInfo {...props} />}
            />
            <Route
              userType="branch"
              exact
              path={URL.branchSettingsUrl}
              component={(props) => <BranchSettings {...props} />}
            />
            {/* ==================== */}
            {/* Branch public Routes */}
            {/* ==================== */}
            <Route
              exact
              path={URL.branchLoginUrl}
              component={(props) => <SignInPage type="branch" {...props} />}
            />
            <Route
              exact
              path={URL.branchForgotPasswordUrl}
              component={(props) => (
                <ForgotPasswordPage type="branch" {...props} />
              )}
            />
            <Route
              exact
              path={URL.branchOtpUrl}
              component={(props) => (
                <OTPForgotPasswordPage type="branch" {...props} />
              )}
            />
            {/* ============== */}
            {/* Cashier Routes */}
            {/* ============== */}
            <Route
              userType="cashier"
              exact
              path={URL.cashierDashboardUrl}
              component={(props) => <CashierDashboard {...props} />}
            />
            <Route
              userType="cashier"
              exact
              path={URL.invoiceUrl}
              component={(props) => <InvoiceList {...props} />}
            />
            {/* ===================== */}
            {/* Cashier Public Routes */}
            {/* ===================== */}
            <Route
              exact
              path={URL.cashierLoginUrl}
              component={(props) => <SignInPage type="cashier" {...props} />}
            />
            <Route
              exact
              path={URL.cashierForgotPasswordUrl}
              component={(props) => (
                <ForgotPasswordPage type="cashier" {...props} />
              )}
            />
            <Route
              exact
              path={URL.cashierOtpUrl}
              component={(props) => (
                <OTPForgotPasswordPage type="cashier" {...props} />
              )}
            />
          </Switch>
          <GlobalStyle />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
