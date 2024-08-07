import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import LoginReducer from "./LoginSlice";
import SnackbarReducer from "./SnacbarSlice";
import DialogBoxReducer from "./DialogBoxSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  Login: LoginReducer,
  Snackbar: SnackbarReducer,
  DialogBox: DialogBoxReducer,
});

export default persistReducer(persistConfig, rootReducer);
