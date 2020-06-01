import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ userType, component: Component, ...rest }) => {
  const token = localStorage.getItem(`${userType}Logged`);
  axios.defaults.headers.common.Authorization = token;
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
              pathname: '/',
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

export default ProtectedRoute;
