import findSeats from "./findSeats";
import findTrains from "./findTrains";
import submitTicket from "./submitTicket";

const bookingService = {
  findTrains,
  findSeats,
  submitTicket,
};

export default bookingService;
