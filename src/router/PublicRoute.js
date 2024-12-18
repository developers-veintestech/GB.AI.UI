import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as storage from '../../src/services/utility/storage';

const PublicRoute = () => {
  const token = storage.getLocalStorage('token');
  return token ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicRoute;