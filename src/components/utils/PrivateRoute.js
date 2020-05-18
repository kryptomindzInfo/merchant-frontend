import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('merchantLogged');
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
                // eslint-disable-next-line react/prop-types
                from: props.location.pathname,
              },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
