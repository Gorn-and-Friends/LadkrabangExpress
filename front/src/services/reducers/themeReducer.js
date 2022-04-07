import ActionTypes from "../constants/actionTypes";

const preferDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = preferDark ? "dark" : "light";

const themeReducer = (state = initialTheme, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_THEME:
      return (state = payload);
    default:
      return state;
  }
};

export default themeReducer;
