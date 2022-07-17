import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { profileSelector } from 'src/app/selector';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useSelector(profileSelector);
  return <>{token ? children : <Navigate to="/sign-in" />}</>;
};

export default PrivateRoute;
