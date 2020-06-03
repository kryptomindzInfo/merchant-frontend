import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ type, match, component: Component, ...rest }) => {
  const userLogged = JSON.parse(localStorage.getItem(`${type}Logged`));
  const { token } = userLogged;
  axios.defaults.headers.common.Authorization = token;

  const pathNameBasedOnType = () => {
    switch (type) {
      case 'merchant':
        return '/merchant/login';
      case 'branch':
        return `/branch/${match.params.branchName}/login`;
      case 'cashier':
        return `/cashier/${match.params.branchName}/login`;
      default:
        return '/';
    }
  };
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...rest} {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: { pathNameBasedOnType },
              state: {
                from: props.location.pathname,
              },
            }}
          />
        );
      }}
    />
  );
};
ProtectedRoute.propTypes = {
  type: PropTypes.string.isRequired,
};
export default ProtectedRoute;
