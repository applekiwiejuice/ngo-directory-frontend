import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = auth; //from utils to check if there's token in localStorage

  return (
    // Show the component only if the user is logged in
    // Otherwise, redirect to / which is our signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
  const { isLoggedIn } = auth;

  return (
    // restricted = false meaning public route, unrestricted access
    // restricted = true meaning restricted route such as signin or signup,
    //              do not show if already logged in, we redirect to "/list"
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && restricted ? (
          <Redirect to="/list" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export { PrivateRoute, PublicRoute };