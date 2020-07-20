// merchant URL's
const merchantDashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/:name/login-verify';
const defaultLoginUrl = '/merchant/:name';
const loginUrl = '/merchant/:name/login';
const forgotPasswordUrl = '/merchant/:name/forgot-password';
const otpUrl = '/merchant/:name/otp-forgot-password';
const zoneBranchUrl = '/merchant/:id/branches';
const staffUrl = '/merchant/staff';
const merchantCashierUrl = '/merchant/:id/cashiers';
const merchantCashierInfoUrl = '/merchant/cashier/info/:id';
const merchantBranchInfoUrl = '/merchant/branch/info/:id';
const merchantSettingsUrl = '/merchant/settings';
const merchantFeeRules = '/merchant/settings/fee-rules';
const merchantCommissionRules = '/merchant/settings/commission-rules';
const merchantOfferingsUrl = '/merchant/offerings';
const merchantTaxesUrl = '/merchant/taxes';
const merchantOperationalHistoryUrl = '/merchant/operationalHistory';

// branch URL's
const defaultBranchLoginUrl = '/merchant/branch/:name';
const branchLoginUrl = '/merchant/branch/:name/login';
const branchDashboardUrl = '/branch/dashboard';
const branchSettingsUrl = '/branch/settings';
const branchForgotPasswordUrl = '/branch/:name/forgot-password';
const branchOtpUrl = '/branch/:name/otp-forgot-password';
const branchCashierInfoUrl = '/branch/cashier/info/:id';
const branchVerifyUrl = '/branch/:name/login-verify';

// cashier URL's
const defaultCashierLoginUrl = '/merchant/cashier/:name';
const cashierLoginUrl = '/merchant/cashier/:name/login';
const cashierDashboardUrl = '/cashier/dashboard';
const invoiceUrl = '/cashier/:id/invoices';
const cashierForgotPasswordUrl = '/cashier/:name/forgot-password';
const cashierOtpUrl = '/cashier/:name/otp-forgot-password';
const cashierVerifyUrl = '/cashier/:name/login-verify';
const cashierSettingsUrl = '/cashier/settings';

export {
  merchantDashboardUrl,
  verifyUrl,
  loginUrl,
  forgotPasswordUrl,
  otpUrl,
  zoneBranchUrl,
  staffUrl,
  merchantCashierUrl,
  merchantSettingsUrl,
  merchantFeeRules,
  merchantCommissionRules,
  branchLoginUrl,
  merchantBranchInfoUrl,
  branchDashboardUrl,
  branchSettingsUrl,
  branchVerifyUrl,
  branchCashierInfoUrl,
  merchantCashierInfoUrl,
  cashierDashboardUrl,
  invoiceUrl,
  cashierLoginUrl,
  cashierForgotPasswordUrl,
  cashierOtpUrl,
  cashierSettingsUrl,
  branchForgotPasswordUrl,
  branchOtpUrl,
  defaultBranchLoginUrl,
  defaultCashierLoginUrl,
  cashierVerifyUrl,
  defaultLoginUrl,
  merchantOfferingsUrl,
  merchantTaxesUrl,
  merchantOperationalHistoryUrl,
};
