import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import SignInPage from './SignInPage';
import SignInVerificationPage from './SignInVerificationPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import OTPForgotPasswordPage from './OTPForgotPasswordPage';

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
        <Router forceRefresh="true" basename="/">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <SignInPage {...props} />}
            />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route
              exact
              path="/sign-in-verify"
              render={(props) => <SignInVerificationPage {...props} />}
            />
            <Route
              exact
              path="/forgot-password"
              render={(props) => <ForgotPasswordPage {...props} />}
            />
            <Route
              exact
              path="/otp-forgot-password"
              render={(props) => <OTPForgotPasswordPage {...props} />}
            />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
