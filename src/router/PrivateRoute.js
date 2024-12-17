import React from 'react';
import { Navigate } from 'react-router-dom';
import * as storage from '../../src/services/utility/storage';

const PrivateRoute = ({ children }) => {
  const token = storage.getLocalStorage('token');
  if (!token) {
    return <Navigate to="auth/login" />;
    
  }

  return (
    <>
     
      {children} 
     
    </>
  );
};

export default PrivateRoute;

