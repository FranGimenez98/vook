import { createContext, useReducer } from "react";
import LikesReducer from "./LikesReducer";

export const initialState = {
  loading: "",
  likes: [],
  error: "",
  dislike: "",
};

export const LikesContext = createContext(initialState);

export const LikesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LikesReducer, initialState);

  return (
    <LikesContext.Provider
      value={{
        likes: state.likes,
        loading: "",
        error: "",
        dislike: "",
        dispatch,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};
