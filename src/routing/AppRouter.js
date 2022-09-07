import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Login from '../pages/login/Login';
import Nav from 'components/nav/Nav';

const AppRoutes = () => {
  // const { auth } = useContext(AuthContext);
  const token = localStorage.getItem('login-token');

  return (
    <BrowserRouter>
      {token && <Nav />}
      <Routes>
        {token ? (
          <>
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/dashboard' />} />
          </>
        ) : (
          <>
            <Route path='/*' element={<Navigate to='/login' />} />
            <Route path='login' element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
