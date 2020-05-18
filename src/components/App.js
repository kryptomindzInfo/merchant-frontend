import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Router, Route, Switch } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import SignInPage from './SignInPage';
import SignInVerificationPage from './SignInVerificationPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import OTPForgotPasswordPage from './OTPForgotPasswordPage';
import history from './utils/history';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#417505',
      hover: '#264503',
    },
    // secondary: '#6cac69',
    // accent: '#f5a623',
    // light: '#9ea0a5',
    // greyLine: '#666565 ',
    white: 'white',
    main: '#417505',
    vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
    hGradient: 'linear-gradient(to right, #6cac6a 1%, #102910)',
    font: 'Roboto',
    fontSize: '14px',
  },
  status: {
    danger: orange,
  },
  typography: {
    color: 'white',
    fontFamily: ['Roboto', 'sans-serif'].join(),
  },
});

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Router history={history} forceRefresh="true" basename="/">
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <SignInPage
                  verifyUrl="/login-verify"
                  dashboardUrl="/dashboard"
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/login"
              component={(props) => (
                <SignInPage
                  verifyUrl="/login-verify"
                  dashboardUrl="/dashboard"
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/login-verify"
              component={(props) => (
                <SignInVerificationPage
                  dashboardUrl="/dashboard"
                  loginUrl="/login"
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/forgot-password"
              component={(props) => <ForgotPasswordPage {...props} />}
            />
            <Route
              exact
              path="/otp-forgot-password"
              component={(props) => <OTPForgotPasswordPage {...props} />}
            />
            <Route
              exact
              path="/merchant/login"
              component={(props) => (
                <SignInPage
                  verifyUrl="/merchant/login-verify"
                  dashboardUrl="/merchant/dashboard"
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/merchant/login-verify"
              component={(props) => (
                <SignInVerificationPage
                  loginUrl="/merchant/login"
                  dashboardUrl="/merchant/dashboard"
                  {...props}
                />
              )}
            />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
