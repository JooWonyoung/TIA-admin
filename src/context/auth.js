import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access_token: '',
    created_at: '',
    email: '',
    email_verified_at: '',
    expires_at: '',
    id: '',
    level: '',
    name: '',
    token_type: '',
    updated_at: '',
  });
  const logout = () => {
    localStorage.removeItem('login-token');
    setAuth({
      access_token: '',
      created_at: '',
      email: '',
      email_verified_at: '',
      expires_at: '',
      id: '',
      level: '',
      name: '',
      token_type: '',
      updated_at: '',
    });
    alert('로그인 토큰이 만료되었습니다. 다시 로그인 해주세요.');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
