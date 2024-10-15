import Cookies from "js-cookie";
import React, { createContext, useContext, useState, useEffect } from "react";
import { checkAuthentication } from "../APIs/UserAPIs";
import { getprofileAddress } from "../APIs/UserAPIs";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  function onLogin(user) {
   
    setUser(user);
  }

  function onLogout() {
    Cookies.remove("token");
    localStorage.removeItem("prevPath");
    localStorage.removeItem("selectedKey");
    setUser(null);
  }

  function onSetProfile(profile) {
    setUser((prevUser) => ({
      ...prevUser,
      ...profile,
    }));
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const res = await checkAuthentication(token);

        onLogin({
          ...res.data.user,
          token,
        });
      } catch (error) {
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    async function checkaddress() {
      const token = Cookies.get("token");
      try {
        if (!token) return;
        await getprofileAddress({ token: token, id: user?.id }).then((res) => {
          setAddress(res.data);
        });
      } catch (error) {}
    }

    checkaddress();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        onLogin,
        onLogout,
        isCheckingAuth,
        onSetProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Context used outside boundary.");
  return context;
};

export default UserProvider;
