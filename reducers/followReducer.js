export const initialState = {
  loading: "",
  follow: [],
  error: "",
  successUnfollow: "",
};

export function followReducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, follow: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FOLLOW_REQUEST":
      return { ...state, loading: true };
    case "FOLLOW_SUCCESS":
      return {
        ...state,
        loading: false,
        follow: [...state.follow, action.payload],
      };
    case "FOLLOW_FAIL":
      return { ...state, loading: false };
    case "UNFOLLOW_REQUEST":
      return { ...state, loading: true };
    case "UNFOLLOW_SUCCESS":
      return { ...state, loading: false, successUnfollow: true };
    case "UNFOLLOW_FAIL":
      return { ...state, loading: false };
    case "UNFOLLOW_RESET":
      return { ...state, loading: false, successUnfollow: false };

    default:
      state;
  }
}
