import { AuthContextManager } from "./AuthManager";
import { useContext } from "react";

const useAuthManager = () => {
  const context = useContext(AuthContextManager);
  if (context === undefined) {
    throw new Error("useAuthManager must be used within AuthManagerProvider");
  }
  return context;
};

export { useAuthManager };
