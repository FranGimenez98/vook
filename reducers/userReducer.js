export const initialState = {
    loading: "",
    user: [],
    error: "",
    successDelete: "",
};
  export function userReducer(state, action) {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, user: action.payload, error: "" };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      case "CREATE_REQUEST":
        return { ...state, loading: true };
      case "CREATE_SUCCESS":
        return { ...state, loading: false,  user: [...state.user, action.payload]};
      case "CREATE_FAIL":
        return { ...state, loading: false };
      case "DELETE_REQUEST":
        return { ...state, loading: true };
      case "DELETE_SUCCESS":
        return { ...state, loading: false, successDelete: true };
      case "DELETE_FAIL":
        return { ...state, loading: false };
      case "DELETE_RESET":
        return { ...state, loading: false, successDelete: false };
  
      default:
        state;
    }
  }
  