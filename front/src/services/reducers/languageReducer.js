import ActionTypes from "../constants/actionTypes";

const userLang = navigator.language || navigator.userLanguage;
const initialLanguage = userLang === "th" ? "th" : "en";

const languageReducer = (state = initialLanguage, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LANGUAGE:
      return (state = payload);
    default:
      return state;
  }
};

export default languageReducer;
