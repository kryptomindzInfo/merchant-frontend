// merchant URL's
const merchantDashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/login-verify';
const loginUrl = '/merchant/login';
const forgotPasswordUrl = '/merchant/forgot-password';
const otpUrl = '/merchant/otp-forgot-password';
const branchUrl = '/merchant/branches';
const staffUrl = '/merchant/staff';
const branchProfileUrl = '/merchant/branch/info/:id';

// branch URL's
const defaultBranchLoginUrl = '/merchant/branch/:branchName';
const branchLoginUrl = '/merchant/branch/:branchName/login';
const branchCashiersUrl = '/merchant/branch/:branchName/cashiers';
const branchDashboardUrl = '/merchant/branch/:branchName/dashboard';
const branchSettingsUrl = '/merchant/branch/:branchName/settings';
const cashierInfoUrl = '/merchant/branch/cashier/info/:id';
const branchForgotPasswordUrl = '/merchant/branch/:branchName/forgot-password';
const branchOtpUrl = '/merchant/branch/:branchName/otp-forgot-password';

// cashier URL's
const defaultCashierLoginUrl = '/merchant/cashier/:branchName';
const cashierLoginUrl = '/merchant/cashier/:branchName/login';
const cashierDashboardUrl = '/merchant/cashier/:branchName/dashboard';
const invoiceUrl = '/merchant/cashier/invoice/:groupId';
const cashierForgotPasswordUrl =
  '/merchant/cashier/:branchName/forgot-password';
const cashierOtpUrl = '/merchant/cashier/:branchName/otp-forgot-password';

export {
  merchantDashboardUrl,
  verifyUrl,
  loginUrl,
  forgotPasswordUrl,
  otpUrl,
  branchUrl,
  staffUrl,
  branchLoginUrl,
  branchProfileUrl,
  branchCashiersUrl,
  branchDashboardUrl,
  branchSettingsUrl,
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
