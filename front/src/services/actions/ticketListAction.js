import ActionTypes from "../constants/actionTypes";

const setTicketList = (ticket) => {
  return {
    type: ActionTypes.SET_TICKET,
    payload: ticket,
  };
};

export default setTicketList;
