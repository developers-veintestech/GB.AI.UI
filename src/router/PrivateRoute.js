import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as storage from '../../src/services/utility/storage';

const PrivateRoute = () => {
  const token = storage.getLocalStorage('token');

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;