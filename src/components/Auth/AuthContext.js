import { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ status: false, id: "", email: "" });

  return (
    <AuthCtx.Provider value={{ auth, setAuth }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthCtx);

  if (!auth || !setAuth) {
    throw new Error("Invalid Usage of useContext.");
  }

  return { auth, setAuth };
};