import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {email}

  useEffect(() => {
    const saved = localStorage.getItem("pt_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email & password required");
    const u = { email };
    setUser(u);
    localStorage.setItem("pt_user", JSON.stringify(u));
  };

  const signup = async ({ email, password }) => {
    return login({ email, password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pt_user");
  };

  return (
    <AuthCtx.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
