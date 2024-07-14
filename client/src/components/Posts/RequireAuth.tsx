import React, { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const RequireAuth = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return data ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
