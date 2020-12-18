import TAG from "../../TAG";

const action = {
  turnOn: () => ({ type: TAG.LOADING.TURN_ON }),
  turnOff: () => ({ type: TAG.LOADING.TURN_OFF }),
};

export default action;
