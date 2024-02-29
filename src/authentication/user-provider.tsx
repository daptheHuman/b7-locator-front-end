import { AxiosError } from 'axios';
import React, { ReactNode } from 'react';

import axios from 'src/config/axios';

import { getUser } from './api/auth';
import { userLogin } from './api/login';
import { UserContext } from './user-context';
import { userRegister } from './api/register';

type UserProviderProps = {
  children: ReactNode;
};
const UserProvider = ({ children }: UserProviderProps) => {
  const initialState = React.useMemo(() => null, []);
  const [user, setUser] = React.useState<User | null>(initialState);

  const initialToken = '';
  const [token, setToken] = React.useState<string>(initialToken);

  React.useEffect(() => {
    const existingToken = localStorage.getItem('token');
    console.log(existingToken);

    if (existingToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${existingToken}`;
      getUser().then((_user) => setUser(_user));
    }
  }, []);

  React.useEffect(() => {
    if (token !== initialToken) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      getUser().then((_user) => {
        setUser(_user);
      });
    }
  }, [initialState, token]);

  const register = React.useCallback(
    (registerInput: AuthInput) =>
      userRegister(registerInput)
        .then((_token) => {
          setToken(_token.access_token);
        })
        .catch((error: AxiosError) => {
          throw error.response?.data;
        }),
    []
  );

  const login = React.useCallback(
    (loginInput: AuthInput) =>
      userLogin(loginInput)
        .then((_token) => {
          setToken(_token.access_token);
        })
        .catch((error: AxiosError) => {
          throw error.response?.data;
        }),
    []
  );

  const logout = React.useCallback(() => {
    setUser(null);
    setToken('');
    localStorage.clear();
  }, []);

  const providerValue = React.useMemo(
    () => ({
      user,
      register,
      login,
      logout,
    }),
    [user, register, login, logout]
  );
  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
