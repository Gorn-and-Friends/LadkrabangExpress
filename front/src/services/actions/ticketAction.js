import ActionTypes from "../constants/actionTypes";

const setTicket = (ticket) => {
  return {
    type: ActionTypes.SET_TICKET,
    payload: ticket,
  };
};

export default setTicket;
