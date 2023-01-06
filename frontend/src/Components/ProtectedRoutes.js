import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = localStorage.getItem("user");

  //Outlet will only be shown if the auth is set in the local storage
  //otherwise the user will be redirected to the signup page
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoutes;
