import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const useAuth = () => {

  const isLogged = useSelector((state) => state.isLogged);
  const user = { loggedIn: isLogged };

  return user && user.loggedIn;
};

const Auth = () => {
  // const isAuth = useAuth();
  const isAuth = localStorage.getItem("token");
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default Auth;
