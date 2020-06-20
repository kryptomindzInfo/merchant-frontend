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
import MerchantDashboardPage from './merchant/dashboard/MerchantDashboardPage';
import MerchantStaffListPage from './merchant/staff/MerchantStaffListPage';
import MerchantBranchListPage from './merchant/branch/MerchantBranchListPage';
import MerchantBranchInfoPage from './merchant/branch/MerchantBranchInfoPage';
import GlobalStyle from '../styles/global-styles';
import BranchCashierInfoPage from './branch/dashboard/BranchCashierInfoPage';
import BranchSettingsPage from './branch/settings/BranchSettingsPage';
import BranchDashboardPage from './branch/dashboard/BranchDashboardPage';
import CashierDashboardPage from './cashier/dashboard/CashierDashboardPage';
import InvoiceListPage from './cashier/invoice/InvoiceListPage';
import MerchantSettingsPage from './merchant/settings/MerchantSettingsPage';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import SharingRulesPage from './merchant/settings/SharingRulesPage';
import {
  branchCashierInfoUrl,
  branchDashboardUrl,
  branchForgotPasswordUrl,
  branchLoginUrl,
  branchOtpUrl,
  merchantBranchInfoUrl,
  branchSettingsUrl,
  branchUrl,
  branchVerifyUrl,
  cashierDashboardUrl,
  cashierForgotPasswordUrl,
  cashierLoginUrl,
  cashierOtpUrl,
  merchantCashierUrl,
  cashierVerifyUrl,
  commissionSharingRules,
  defaultBranchLoginUrl,
  defaultCashierLoginUrl,
  forgotPasswordUrl,
  invoiceUrl,
  loginUrl,
  merchantCashierInfoUrl,
  merchantDashboardUrl,
  merchantSettingsUrl,
  otpUrl,
  revenueSharingRules,
  staffUrl,
  verifyUrl,
  zoneBranchUrl,
  cashierSettingsUrl,
} from './Url';
import MerchantCashierListPage from './merchant/branch/cashier/MerchantCashierListPage';
import MerchantCashierInfoPage from './merchant/branch/cashier/MerchantCashierInfo';
import CashierSettingsPage from './cashier/settings/CashierSettingsPage';

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
              component={(props) => <MerchantDashboardPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={zoneBranchUrl}
              component={(props) => <MerchantBranchListPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantBranchInfoUrl}
              component={(props) => <MerchantBranchInfoPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={staffUrl}
              component={(props) => <MerchantStaffListPage {...props} />}
            />
            <ProtectedRoute
              exact
              type="merchant"
              path={merchantSettingsUrl}
              component={(props) => <MerchantSettingsPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantCashierUrl}
              component={(props) => (
                <MerchantCashierListPage type="merchant" {...props} />
              )}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantCashierInfoUrl}
              component={(props) => <MerchantCashierInfoPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={revenueSharingRules}
              component={(props) => (
                <SharingRulesPage ruleType="Revenue" {...props} />
              )}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={commissionSharingRules}
              component={(props) => (
                <SharingRulesPage ruleType="Commission" {...props} />
              )}
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
            {/* ============= */}
            {/* Branch Routes */}
            {/* ============= */}
            <ProtectedRoute
              type="branch"
              exact
              path={branchDashboardUrl}
              component={(props) => <BranchDashboardPage {...props} />}
            />
            <ProtectedRoute
              type="branch"
              exact
              path={branchCashierInfoUrl}
              component={(props) => (
                <BranchCashierInfoPage type="branch" {...props} />
              )}
            />
            <ProtectedRoute
              type="branch"
              exact
              path={branchSettingsUrl}
              component={(props) => <BranchSettingsPage {...props} />}
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
            <ProtectedRoute
              exact
              type="branch"
              path={branchVerifyUrl}
              component={(props) => (
                <SignInVerificationPage type="branch" {...props} />
              )}
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
            <ProtectedRoute
              type="cashier"
              exact
              path={cashierDashboardUrl}
              component={(props) => <CashierDashboardPage {...props} />}
            />
            <ProtectedRoute
              type="cashier"
              exact
              path={invoiceUrl}
              component={(props) => <InvoiceListPage {...props} />}
            />
            <ProtectedRoute
              type="cashier"
              exact
              path={cashierSettingsUrl}
              component={(props) => <CashierSettingsPage {...props} />}
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
            <ProtectedRoute
              exact
              type="cashier"
              path={cashierVerifyUrl}
              component={(props) => (
                <SignInVerificationPage type="cashier" {...props} />
              )}
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
