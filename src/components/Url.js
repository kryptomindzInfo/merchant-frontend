// merchant URL's
const merchantDashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/login-verify';
const loginUrl = '/merchant/login';
const forgotPasswordUrl = '/merchant/forgot-password';
const otpUrl = '/merchant/otp-forgot-password';
const branchUrl = '/merchant/branches';
const staffUrl = '/merchant/staff';
const branchProfileUrl = '/merchant/branch/info/:id';
const merchantSettingsUrl = '/merchant/info';

// branch URL's
const defaultBranchLoginUrl = '/merchant/branch/:name';
const branchLoginUrl = '/merchant/branch/:name/login';
const branchCashiersUrl = '/merchant/branch/cashiers';
const branchDashboardUrl = '/merchant/branch/dashboard';
const branchSettingsUrl = '/merchant/branch/settings';
const cashierInfoUrl = '/merchant/branch/cashier/info/:id';
const branchForgotPasswordUrl = '/merchant/branch/:name/forgot-password';
const branchOtpUrl = '/merchant/branch/:name/otp-forgot-password';
const branchVerifyUrl = '/merchant/branch/:name/login-verify';

// cashier URL's
const defaultCashierLoginUrl = '/merchant/cashier/:name';
const cashierLoginUrl = `/merchant/cashier/:name/login`;
const cashierDashboardUrl = '/merchant/cashier/:name/dashboard';
const invoiceUrl = '/merchant/cashier/invoice/:groupId';
const cashierForgotPasswordUrl = '/merchant/cashier/:name/forgot-password';
const cashierOtpUrl = '/merchant/cashier/:name/otp-forgot-password';

export {
  merchantDashboardUrl,
  verifyUrl,
  loginUrl,
  forgotPasswordUrl,
  otpUrl,
  branchUrl,
  staffUrl,
  merchantSettingsUrl,
  branchLoginUrl,
  branchProfileUrl,
  branchCashiersUrl,
  branchDashboardUrl,
  branchSettingsUrl,
  branchVerifyUrl,
  cashierInfoUrl,
  cashierDashboardUrl,
  invoiceUrl,
  cashierLoginUrl,
  cashierForgotPasswordUrl,
  cashierOtpUrl,
  branchForgotPasswordUrl,
  branchOtpUrl,
  defaultBranchLoginUrl,
  defaultCashierLoginUrl,
};
