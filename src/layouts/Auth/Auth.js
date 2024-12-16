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
import axios from 'axios';
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";

import routes from "routes.js";

const Pages = (props) => {
  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
  });
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getFullPageName = (routes) => {
    let pageName = getActiveRoute(routes);
    switch (pageName) {
      case "Pricing":
        return "pricing-page";
      case "Login":
        return "login-page";
      case "Register":
        return "register-page";
      case "Lock Screen":
        return "lock-page";
      default:
        return "Default Brand Text";
    }
  };
  return (
    <>
      <AuthNavbar brandText={getActiveRoute(routes) + " Page"} />
      <div className="wrapper wrapper-full-page">
        <div className={"full-page " + getFullPageName(routes)}>
          <Routes>
            {getRoutes(routes)}
            <Route to="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
          <Footer fluid />
        </div>
      </div>
    </>
  );
};

export default Pages;

export const login = async (payload) => {
  const { username, password,clientid,clientsecret} = payload;

  try {
    const response = await axios.post('https://authid.greenyourbills.com/Token/GetAccessToken', {
      username,
      password,
      clientid,
     clientsecret
    });
    if (response.data) {
      return {
        success: true,
        token: response.data.AccessToken, 
        message: 'Login successful',
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Invalid credentials. Please try again.',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred while logging in. Please try again.',
    };
  }
};
