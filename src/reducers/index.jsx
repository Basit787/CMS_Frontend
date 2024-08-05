import storage from "redux-persist/lib/storage";
import LoginReducer from "./LoginSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  Login: LoginReducer,
});

export default persistReducer(persistConfig, rootReducer);
