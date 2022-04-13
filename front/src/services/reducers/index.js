import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import themeReducer from "./themeReducer";
import loadingReducer from "./loadingReducer";

const reducers = combineReducers({
  theme: themeReducer,
  lang: languageReducer,
  loading: loadingReducer,
});

export default reducers;
