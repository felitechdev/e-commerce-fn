import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuthentication } from '../APIs/UserAPIs';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  function onLogin(user) {
    setUser(user);
  }

  function onLogout() {
    Cookies.remove('token');
    setUser(null);
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = Cookies.get('token');
        if (!token) return;

        const res = await checkAuthentication(token);

        onLogin({
          ...res.data.user,
          token,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout, isCheckingAuth }}>
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
