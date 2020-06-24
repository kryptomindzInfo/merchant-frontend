import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUrlBasedOnType } from './utils/urlUtils';

const PrivateRoute = ({ type, component: Component, ...rest }) => {
  const mobile = localStorage.getItem(`otpNo_${type}`);
  const name = localStorage.getItem(`${type}_name`);
  const pathNameBasedOnType = () =>
    getUrlBasedOnType(type, name, 'forgot-password');
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
