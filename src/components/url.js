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
const cashierUrl = '/branch/cashiers/:branchName';
const branchDashboardUrl = '/branch/:branchName/dashboard';
const branchSettingsUrl = '/branch/settings';
const cashierInfoUrl = '/branch/cashier/info/:id';

// cashier URL's
const cashierDashboardUrl = '/cashier/:branchName/dashboard';

export default {
  merchantDashboardUrl,
  verifyUrl,
  loginUrl,
  otpUrl,
  branchUrl,
  staffUrl,
  branchLoginUrl,
  branchProfileUrl,
  cashierUrl,
  branchDashboardUrl,
  branchSettingsUrl,
  cashierInfoUrl,
  cashierDashboardUrl,
};
