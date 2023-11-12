import { ContextManager } from "./ContextProvider";
import { useContext } from "react";

const useBookMarkContext = () => {
  const context = useContext(ContextManager);
  if (context === undefined) {
    throw new Error("useBookMarkContext must be used within a ContextProvider");
  }
  return context;
};

export { useBookMarkContext };
