"use client";
import React, { createContext, useReducer } from "react";

interface ContextProps {
  bookmarks: string[];
  subcommentsId: string;
}
const ContextManager = createContext(null) as React.Context<any>;
const reducer = (state: ContextProps, action: any) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return {
        ...state,
        isBookmarked: true,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark !== action.payload
        ),
      };
    case "ADD_SUBCOMMENT":
      return {
        ...state,
        subcommentsId: action.payload,
      };
    default:
      return state;
  }
};
const initialState = {
  bookmarks: [],
  subcommentsId: "",
};

const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <ContextManager.Provider value={{ state, dispatch }}>
      {children}
    </ContextManager.Provider>
  );
};

export { ContextManager, ContextProvider };
