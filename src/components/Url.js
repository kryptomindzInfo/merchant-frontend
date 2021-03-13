// merchant URL's
const merchantDashboardUrl = '/merchant/dashboard';
const verifyUrl = '/merchant/:name/login-verify';
const defaultLoginUrl = '/merchant/:name';
const loginUrl = '/merchant/:name/login';
const forgotPasswordUrl = '/merchant/:name/forgot-password';
const otpUrl = '/merchant/:name/otp-forgot-password';
const zoneBranchUrl = '/merchant/:id/branches';
const zoneSubzoneUrl = '/merchant/:id/subzones';
const staffUrl = '/merchant/staff';
const merchantCashierUrl = '/merchant/:id/cashiers';
const merchantCashierInfoUrl = '/merchant/cashier/info/:id';
const merchantBranchInfoUrl = '/merchant/branch/info/:id';
const merchantBranchReportUrl = '/merchant/branch/reports/:id';
const merchantStaffReportUrl = '/merchant/staff/reports/:id';
const merchantCashierReportUrl = '/merchant/cashier/reports/:id';
const merchantBranchDashboadUrl = '/merchant/branch/dashboard/:id';
const merchantSettingsUrl = '/merchant/settings';
const merchantFeeRules = '/merchant/settings/fee-rules';
const merchantInterBankCommissionRules = '/merchant/settings/inter-bank-commission-rules';
const merchantInterBankFeeRules = '/merchant/settings/interbank-fee-rules';
const merchantCommissionRules = '/merchant/settings/commission-rules';
const merchantZoneSettings = '/merchant/settings/zoneSettings';
const merchantBillPeriodSettings = '/merchant/settings/billPeriodSettings';
const merchantPenaltySettings = '/merchant/settings/penalty';
const merchantBillTermSettings = '/merchant/settings/billTermSettings';
const merchantCategorySettings = '/merchant/settings/categorySettings';
const merchantOfferingsUrl = '/merchant/offerings';
const merchantTaxesUrl = '/merchant/taxes';
const merchantCustomersUrl = '/merchant/customers';
const merchantOperationalHistoryUrl = '/merchant/operationalHistory';

// branch URL's
const defaultBranchLoginUrl = '/merchant/branch/:name';
const branchLoginUrl = '/merchant/branch/:name/login';
const branchDashboardUrl = '/branch/dashboard';
const branchReportsUrl = '/branch/reports';
const branchSettingsUrl = '/branch/settings';
const branchForgotPasswordUrl = '/branch/:name/forgot-password';
const branchOtpUrl = '/branch/:name/otp-forgot-password';
const branchCashierInfoUrl = '/branch/cashier/info/:id';
const branchStaffReportUrl = '/branch/staff/report/:id';
const branchCashierReportUrl = '/branch/cashier/report/:id';
const branchVerifyUrl = '/branch/:name/login-verify';

// cashier URL's
const defaultCashierLoginUrl = '/merchant/cashier/:name';
const cashierLoginUrl = '/merchant/cashier/:name/login';
const staffDashboardUrl = '/staff/dashboard';
const staffReportsUrl = '/staff/reports';
const cashierDashboardUrl = '/cashier/dashboard';
const cashierReportsUrl = '/cashier/reports';
const invoiceUrl = '/cashier/:id/invoices';
const cashierForgotPasswordUrl = '/cashier/:name/forgot-password';
const cashierOtpUrl = '/cashier/:name/otp-forgot-password';
const cashierVerifyUrl = '/cashier/:name/login-verify';
const cashierSettingsUrl = '/cashier/settings';
const cashierBillSettingsUrl = '/cashier/billsettings';

export {
  merchantStaffReportUrl,
  merchantCashierReportUrl,
  merchantBranchDashboadUrl,
  merchantBranchReportUrl,
  branchCashierReportUrl,
  branchReportsUrl,
  merchantCategorySettings,
  branchStaffReportUrl,
  staffReportsUrl,
  cashierReportsUrl,
  merchantDashboardUrl,
  verifyUrl,
  loginUrl,
  forgotPasswordUrl,
  otpUrl,
  zoneBranchUrl,
  zoneSubzoneUrl,
  staffUrl,
  merchantCashierUrl,
  merchantSettingsUrl,
  merchantFeeRules,
  merchantCommissionRules,
  merchantInterBankFeeRules,
  merchantInterBankCommissionRules,
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
  merchantZoneSettings,
  merchantBillPeriodSettings,
  merchantBillTermSettings,
  merchantPenaltySettings,
  merchantCustomersUrl,
  cashierBillSettingsUrl,
  staffDashboardUrl,
};
