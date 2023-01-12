import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    dispatch({ type: "AUTH_USER", payload: true });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const registerCall = async (userCredential, dispatch) => {
  dispatch({ type: "REGISTER_START" });
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", userCredential);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    dispatch({ type: "AUTH_USER", payload: true });
  } catch (err) {
    dispatch({ type: "REGISTER_FAILURE", payload: err });
  }
};