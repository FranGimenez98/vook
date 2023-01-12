const CommentsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, comments: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload],
      };
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
};

export default CommentsReducer