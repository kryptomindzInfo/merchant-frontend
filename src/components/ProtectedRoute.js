import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getUrlBasedOnType } from './utils/urlUtils';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { type } = rest;
  const name = localStorage.getItem(`${type}_name`);
  // console.log("44444444444444444444444444444444444444444444444444444444444444444444444444444")
  const userLogged = JSON.parse(localStorage.getItem(`${type}Logged`));
  console.log(userLogged)
  console.log(type)
  const pathNameBasedOnType = () => getUrlBasedOnType(type, name, 'login');
  if (userLogged) {
    const { token } = userLogged;
    console.log(token)

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
