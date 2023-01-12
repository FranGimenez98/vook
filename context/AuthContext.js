import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) :  {},
  isAuth: Cookies.get("user") ? true : false,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    Cookies.set("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuth: state.isAuth,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
