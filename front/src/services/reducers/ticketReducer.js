import ActionTypes from "../constants/actionTypes";
import InitialStates from "../constants/initialStates";

const ticketReducer = (state = InitialStates.TICKET, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TICKET:
      return (state = payload);
    default:
      return state;
  }
};

export default ticketReducer;
