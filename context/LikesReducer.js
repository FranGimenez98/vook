const CommentsReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, likes: action.payload, error: "" };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      case "LIKE_REQUEST":
        return { ...state, loading: true };
      case "LIKE_SUCCESS":
        return {
          ...state,
          loading: false,
          likes: [...state.likes, action.payload],
        };
      case "LIKE_FAIL":
        return { ...state, loading: false };
      case "DISLIKE_REQUEST":
        return { ...state, loading: true };
      case "DISLIKE_SUCCESS":
        return { ...state, loading: false, dislike: true };
      case "DISLIKE_FAIL":
        return { ...state, loading: false };
      case "DISLIKE_RESET":
        return { ...state, loading: false, dislike: false };
  
      default:
        state;
    }
  };
  
  export default CommentsReducer
  