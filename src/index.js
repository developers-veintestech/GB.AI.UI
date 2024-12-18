/*!

=========================================================
* Black Dashboard PRO React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import PrivateRoute from "../src/router/PrivateRoute";
import './services/intercepter'
import PublicRoute from "router/PublicRoute";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>      
      

      {/* Redirect to admin if authenticated */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />

      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/auth/*" element={<AuthLayout />} />
      </Route>

      {/* Protected route */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Route>
      
    </Routes>
  </BrowserRouter>
);
