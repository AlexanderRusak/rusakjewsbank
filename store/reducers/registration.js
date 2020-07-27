import {
  SET_DATA_IN_DATA_BASE,
  ERROR_INPUT_HANDLER,
  CLEAR_MESSAGE,
  REGISTRATION_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  errorMessage: "",
};
export default function registration(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_IN_DATA_BASE:
      return {
        ...state,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    case ERROR_INPUT_HANDLER:
      return {
        ...state,
        errorMessage: action.message,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
