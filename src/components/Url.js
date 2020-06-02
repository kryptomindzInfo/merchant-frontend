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
const branchLoginUrl = '/branch/:branchName/login';
const branchCashiersUrl = '/branch/cashiers/:branchName';
const branchDashboardUrl = '/branch/:branchName/dashboard';
const branchSettingsUrl = '/branch/settings';
const cashierInfoUrl = '/branch/cashier/info/:id';
const branchForgotPasswordUrl = '/branch/:branchName/forgot-password';
const branchOtpUrl = '/branch/:branchName/otp-forgot-password';

// cashier URL's
const cashierLoginUrl = '/cashier/:branchName/login';
const cashierDashboardUrl = '/cashier/:branchName/dashboard';
const invoiceUrl = '/cashier/invoice/:groupId';
const cashierForgotPasswordUrl = '/cashier/:branchName/forgot-password';
const cashierOtpUrl = '/cashier/:branchName/otp-forgot-password';

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
};
