import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/logout';

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const setLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    dispatch(logoutUser());
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout, setLoggedIn }}>
      {props.children}
    </LoginContext.Provider>
  );
};
