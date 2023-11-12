"use client";

import React, { createContext, useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie";

const AuthContextManager = createContext(null) as React.Context<any>;

const initialState = {
  user: null,
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
function AuthManagerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  return (
    <AuthContextManager.Provider value={{ state, dispatch }}>
      {children}
    </AuthContextManager.Provider>
  );
}

export { AuthContextManager, AuthManagerProvider };
