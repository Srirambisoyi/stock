import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   // console.log(_user)
  //   if (user) {
  //     console.log(user);
  //     login(user);
  //     setLoader(false);
  //   } else {
  //     setLoader(false);
  //   }
  // }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
