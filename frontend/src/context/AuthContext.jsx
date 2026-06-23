import React, {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "userInfo"
      );

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }

    setLoading(false);
  }, []);

  const login = (
    userData
  ) => {

    setUser(userData);

    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );
  };
const logout = () => {
  setUser(null);

  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");

  window.location.href = "/login";
};

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated:
      !!user,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};