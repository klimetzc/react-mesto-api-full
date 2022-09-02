import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoggedIn } from "./App";

const ProtectedRoute = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedIn);
  return loggedIn ? props.children : <Navigate to="/sign-up" />;
};

export default ProtectedRoute;
