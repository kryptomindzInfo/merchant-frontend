import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ type, match, component: Component, ...rest }) => {
  const [pathName, setPathName] = React.useState('/');
  const { branchName } = match.params;
  const token = localStorage.getItem(`${type}Logged`);
  axios.defaults.headers.common.Authorization = token;

  const pathNameBasedOnType = () => {
    switch (type) {
      case 'merchant':
        setPathName('/merchant/login');
        break;
      case 'branch':
        setPathName(`/branch/${branchName}/login`);
        break;
      case 'cashier':
        setPathName(`/cashier/${branchName}/login`);
        break;
      default:
        setPathName('/');
        break;
    }
  };
  useEffect(() => pathNameBasedOnType());
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
              pathname: { pathName },
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
