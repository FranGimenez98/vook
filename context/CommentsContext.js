import { createContext, useReducer } from "react";
import CommentsReducer from "./CommentsReducer";

export const initialState = {
  loading: "",
  comments: [],
  error: "",
  successDelete: "",
};

export const CommentsContext = createContext(initialState);

export const CommentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentsReducer, initialState);

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        loading: "",
        error: "",
        successDelete: "",
        dispatch,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
