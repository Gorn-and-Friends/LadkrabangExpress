import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import themeReducer from "./themeReducer";

const reducers = combineReducers({
  theme: themeReducer,
  lang: languageReducer,
});

export default reducers;
