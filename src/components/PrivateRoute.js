import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUrlBasedOnType } from './utils/ForgotPasswordAPI';

const PrivateRoute = ({ type, match, component: Component, ...rest }) => {
  const mobile = JSON.parse(localStorage.getItem(`otpNo_${type}`));
  const pathNameBasedOnType = () =>
    getUrlBasedOnType(type, match.params.name, 'forgot-password');
  if (mobile) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...rest} {...props} />;
        }}
      />
    );
  }
  return (
    <Redirect
      to={{
        pathname: pathNameBasedOnType(),
        state: {
          from: rest.location.pathname,
        },
      }}
    />
  );
};
PrivateRoute.propTypes = {
  type: PropTypes.string.isRequired,
};
export default PrivateRoute;
