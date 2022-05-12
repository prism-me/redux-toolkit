import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";

import reducers from "./feature";
import api from "./middleware/api";
import logger from "./middleware/logger";

const store = configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware(), logger("console"), api],
});

export default store;
