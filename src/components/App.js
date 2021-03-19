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
import MerchantEwalletHistory from './merchant/dashboard/MerchantEwalletHistory';
import MerchantStaffListPage from './merchant/staff/MerchantStaffListPage';
import MerchantBranchListPage from './merchant/branch/MerchantBranchListPage';
import MerchantSubzoneListPage from './merchant/subzone/MerchantSubzoneListPage';
import MerchantBranchInfoPage from './merchant/branch/MerchantBranchInfoPage';
import MerchantOfferingListPage from './merchant/offerings/MerchantOfferingListPage';
import MerchantCustomerListPage from './merchant/customers/MerchantCustomerListPage';
import MerchantTaxListPage from './merchant/taxes/MerchantTaxListPage';
import GlobalStyle from '../styles/global-styles';
import BranchCashierInfoPage from './branch/dashboard/BranchCashierInfoPage';
import BranchSettingsPage from './branch/settings/BranchSettingsPage';
import ZoneSettingPage from './merchant/settings/ZoneSettingPage';
import BillPeriodSettingPage from './merchant/settings/BillPeriodSettingPage';
import CategorySettingPage from './merchant/settings/CategorySettingPage';
import PenaltySettingPage from './merchant/settings/PenaltySettingPage';
import BillTermSettingPage from './merchant/settings/BillTermSettingPage';
import BranchDashboardPage from './branch/dashboard/BranchDashboardPage';
import BranchReports from './branch/Reports/BranchReports';
import StaffDashboardPage from './cashier/dashboard/StaffDashboardPage';
import ReportPage from './merchant/reports/ReportPage';
import StaffReportPage from './cashier/reports/StaffReportPage';
import CashierReportPage from './cashier/reports/CashierReportPage';
import CashierDashboardPage from './cashier/dashboard/CashierDashboardPage';
import InvoiceListPage from './cashier/invoice/InvoiceListPage';
import MerchantSettingsPage from './merchant/settings/MerchantSettingsPage';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import SharingRulesPage from './merchant/settings/SharingRulesPage';
import {
  reportUrl,
  merchantStaffReportUrl,
  merchantCashierReportUrl,
  merchantBranchDashboadUrl,
  merchantBranchReportUrl,
  branchCashierReportUrl,
  branchCashierInfoUrl,
  branchStaffReportUrl,
  branchDashboardUrl,
  branchReportsUrl,
  branchForgotPasswordUrl,
  branchLoginUrl,
  branchOtpUrl,
  merchantBranchInfoUrl,
  branchSettingsUrl,
  branchUrl,
  cashierDashboardUrl,
  branchVerifyUrl,
  staffDashboardUrl,
  staffReportsUrl,
  cashierReportsUrl,
  cashierForgotPasswordUrl,
  cashierLoginUrl,
  cashierOtpUrl,
  merchantCashierUrl,
  cashierVerifyUrl,
  merchantCommissionRules,
  defaultBranchLoginUrl,
  defaultCashierLoginUrl,
  forgotPasswordUrl,
  invoiceUrl,
  loginUrl,
  merchantCashierInfoUrl,
  merchantDashboardUrl,
  merchantSettingsUrl,
  otpUrl,
  merchantFeeRules,
  staffUrl,
  verifyUrl,
  zoneBranchUrl,
  zoneSubzoneUrl,
  cashierSettingsUrl,
  cashierBillSettingsUrl,
  defaultLoginUrl,
  merchantOfferingsUrl,
  merchantTaxesUrl,
  merchantCustomersUrl,
  merchantOperationalHistoryUrl,
  merchantZoneSettings,
  merchantBillPeriodSettings,
  merchantBillTermSettings,
  merchantPenaltySettings,
  merchantCategorySettings,
  merchantInterBankFeeRules,
  merchantInterBankCommissionRules,
} from './Url';
import MerchantCashierListPage from './merchant/branch/cashier/MerchantCashierListPage';
import MerchantCashierInfoPage from './merchant/branch/cashier/MerchantCashierInfo';
import CashierSettingsPage from './cashier/settings/CashierSettingsPage';
import CashierBillSettingsPage from './cashier/settings/CashierBillSettingsPage';
import MerchantPayBills from './cashier/MerchantPayBills/CashierMerchantListPage';

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
            <Route
              exact
              path="/paybills"
              component={(props) => (
                <MerchantPayBills type="merchant" {...props} />
              )}
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
              path={merchantOperationalHistoryUrl}
              component={(props) => <MerchantEwalletHistory {...props} />}
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
              path={zoneSubzoneUrl}
              component={(props) => <MerchantSubzoneListPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantBranchInfoUrl}
              component={(props) => <MerchantBranchInfoPage {...props} />}
            />
            <ProtectedRoute
              apitype="merchant"
              type="merchant"
              exact
              path={merchantBranchReportUrl}
              component={(props) => <BranchReports {...props} />}
            />
            <ProtectedRoute
              apitype="merchant"
              type="merchant"
              exact
              path={merchantStaffReportUrl}
              component={(props) => <StaffReportPage {...props} />}
            />
            <ProtectedRoute
              apitype="merchant"
              type="merchant"
              exact
              path={merchantCashierReportUrl}
              component={(props) => <CashierReportPage {...props} />}
            />
            
            <ProtectedRoute
              apitype="merchant"
              type="merchant"
              exact
              path={merchantBranchDashboadUrl}
              component={(props) => <BranchDashboardPage {...props} />}
            />
            
            <ProtectedRoute
              type="merchant"
              exact
              path={staffUrl}
              component={(props) => <MerchantStaffListPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={reportUrl}
              component={(props) => <ReportPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantOfferingsUrl}
              component={(props) => <MerchantOfferingListPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantTaxesUrl}
              component={(props) => <MerchantTaxListPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantCustomersUrl}
              component={(props) => <MerchantCustomerListPage {...props} />}
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
              path={merchantFeeRules}
              component={(props) => (
                <SharingRulesPage active="fee" bank="intrabank" ruleType="Fee" {...props} />
              )}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantCommissionRules}
              component={(props) => (
                <SharingRulesPage active="commission" bank="intrabank" ruleType="commission" {...props} />
              )}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantInterBankFeeRules}
              component={(props) => (
                <SharingRulesPage active="interbankfee" bank="interbank" ruleType="Fee" {...props} />
              )}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantInterBankCommissionRules}
              component={(props) => (
                <SharingRulesPage active="interbankcommission" bank="interbank" ruleType="Commission" {...props} />
              )}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantZoneSettings}
              component={(props) => <ZoneSettingPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantBillPeriodSettings}
              component={(props) => <BillPeriodSettingPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantBillTermSettings}
              component={(props) => <BillTermSettingPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantPenaltySettings}
              component={(props) => <PenaltySettingPage {...props} />}
            />
            <ProtectedRoute
              type="merchant"
              exact
              path={merchantCategorySettings}
              component={(props) => <CategorySettingPage {...props} />}
            />
            
            {/* ====================== */}
            {/* Merchant Public Routes */}
            {/* ====================== */}
            <Route
              exact
              path={defaultLoginUrl}
              component={(props) => <SignInPage type="merchant" {...props} />}
            />
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
              apitype='merchantBranch'
              exact
              path={branchDashboardUrl}
              component={(props) => <BranchDashboardPage {...props} />}
            />
            <ProtectedRoute
              type="branch"
              exact
              apitype='merchantBranch'
              path={branchReportsUrl}
              component={(props) => <BranchReports {...props} />}
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
              apitype="merchantBranch"
              exact
              path={branchStaffReportUrl}
              component={(props) => (
                <StaffReportPage type="branch" {...props} />
              )}
            />
            <ProtectedRoute
              type="branch"
              apitype="merchantBranch"
              exact
              path={branchCashierReportUrl}
              component={(props) => (
                <CashierReportPage type="branch" {...props} />
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
              path={staffDashboardUrl}
              component={(props) => <InvoiceListPage {...props} />}
            />
            <ProtectedRoute
              type = "cashier"
              apitype = "merchantPosition"
              exact
              path={staffReportsUrl}
              component={(props) => <StaffReportPage  {...props} />}
            />
            <ProtectedRoute
              type="cashier"
              apitype = "merchantPosition"
              exact
              path={cashierReportsUrl}
              component={(props) => <CashierReportPage {...props} />}
            />
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
            <ProtectedRoute
              type="cashier"
              exact
              path={cashierBillSettingsUrl}
              component={(props) => <CashierBillSettingsPage {...props} />}
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
