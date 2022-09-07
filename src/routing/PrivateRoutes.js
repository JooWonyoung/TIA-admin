import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserInfo from '../pages/users/userInfo/UserInfo';
import Reservation from '../pages/users/reservation/Reservation';
import DashBoard from '../pages/dashboard/DashBoard';

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Navigate to='/dashboard' />} />
        <Route path='dashboard' element={<DashBoard />} />
        <Route path='user/userinfo' element={<UserInfo />} />
        <Route path='user/reservation' element={<Reservation />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
