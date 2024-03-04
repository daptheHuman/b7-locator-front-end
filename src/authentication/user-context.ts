import React from 'react';

type UserContent = {
  user: User;
  register: (input: AuthInput) => Promise<void>;
  login: (input: AuthInput) => Promise<void>;
  logout: () => void;
};
const UserContext = React.createContext<UserContent>({} as UserContent);

export { UserContext };
