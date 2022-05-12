import axios from "axios";
import {
  apiCallBegan,
  apiCallFailed,
  apiCallSuccess,
} from "../feature/actions";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) {
      return next(action);
    }
    
    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }
    next(action);

    try {
      const response = await axios.request({
        baseURL: "https://jsonplaceholder.typicode.com",
        url,
        method,
        data,
      });

      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      } else {
        dispatch(apiCallSuccess(response.data));
      }
    } catch (error) {
      if (onError) {
        dispatch({ type: onError, payload: error.message });
      } else {
        dispatch(apiCallFailed(error.message));
      }
    }
  };

export default api;
