import { combineReducers } from "@reduxjs/toolkit";
import blogSlice from "./blog";

const reducers = combineReducers({
  blog: blogSlice,
});

export default reducers;
