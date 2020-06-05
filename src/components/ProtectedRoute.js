import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getUrlBasedOnType } from './utils/ForgotPasswordAPI';

const ProtectedRoute = ({ type, match, component: Component, ...rest }) => {
  const userLogged = JSON.parse(localStorage.getItem(`${type}Logged`));
  const pathNameBasedOnType = () =>
    getUrlBasedOnType(type, match.params.name, 'login');
  if (userLogged) {
    const { token } = userLogged;
    axios.defaults.headers.common.Authorization = token;
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
ProtectedRoute.propTypes = {
  type: PropTypes.string.isRequired,
};
export default ProtectedRoute;
