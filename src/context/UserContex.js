import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function onLogin(user) {
    setUser(user);
  }

  function onLogout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('Context used outside boundary.');
  return context;
};

export default UserProvider;
