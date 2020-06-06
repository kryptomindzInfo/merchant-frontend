// merchant URL's
const merchantDashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/login-verify';
const loginUrl = '/merchant/login';
const forgotPasswordUrl = '/merchant/forgot-password';
const otpUrl = '/merchant/otp-forgot-password';
const branchUrl = '/merchant/branches';
const staffUrl = '/merchant/staff';
const cashierUrl = '/merchant/cashiers/:name';
const merchantCashierInfoUrl = '/merchant/cashier/info/:id';
const branchProfileUrl = '/merchant/branch/info/:id';
const merchantSettingsUrl = '/merchant/settings';

// branch URL's
const defaultBranchLoginUrl = '/merchant/branch/:name';
const branchLoginUrl = '/merchant/branch/:name/login';
const branchDashboardUrl = '/merchant/branch/dashboard';
const branchSettingsUrl = '/merchant/branch/settings';
const branchForgotPasswordUrl = '/merchant/branch/:name/forgot-password';
const branchOtpUrl = '/merchant/branch/:name/otp-forgot-password';
const branchCashierInfoUrl = '/merchant/branch/cashier/info/:id';
const branchVerifyUrl = '/merchant/branch/:name/login-verify';

// cashier URL's
const defaultCashierLoginUrl = '/merchant/cashier/:name';
const cashierLoginUrl = '/merchant/cashier/:name/login';
const cashierDashboardUrl = '/merchant/cashier/dashboard';
const invoiceUrl = '/merchant/cashier/invoice/:groupId';
const cashierForgotPasswordUrl = '/merchant/cashier/:name/forgot-password';
const cashierOtpUrl = '/merchant/cashier/:name/otp-forgot-password';
const cashierVerifyUrl = '/merchant/cashier/:name/login-verify';
const cashierSettingsUrl = '/merchant/cashier/settings';

export {
  merchantDashboardUrl,
  verifyUrl,
  loginUrl,
  forgotPasswordUrl,
  otpUrl,
  branchUrl,
  staffUrl,
  cashierUrl,
  merchantSettingsUrl,
  branchLoginUrl,
  branchProfileUrl,
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
  branchForgotPasswordUrl,
  branchOtpUrl,
  defaultBranchLoginUrl,
  defaultCashierLoginUrl,
  cashierVerifyUrl,
};
