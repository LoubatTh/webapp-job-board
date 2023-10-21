import { createContext, useEffect, useState } from "react";
import { GetUser } from "../services/user.service";

export const AuthContext = createContext();

import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    GetUser()
      .then((res) => {
        setUser(res.data.user);
        setIsLoggedIn(true);
      })
      .catch((e) => {
        setUser(null);
        setIsLoggedIn(false);
        console.error(e);
      });
  }, []);

  const SetLogIn = (isLogged) => {
    setIsLoggedIn(isLogged);

    isLogged
      ? GetUser()
          .then((res) => {
            setUser(res.data.user);
          })
          .catch((e) => {
            setUser(null);
            console.error(e);
          })
      : setUser(null);
  };

  return (
    <>
      <AuthContext.Provider value={{ user, isLoggedIn, SetLogIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
