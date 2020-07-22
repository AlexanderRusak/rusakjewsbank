import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_USERNAME,
  ERROR_INPUT_HANDLER,
  CLEAR_MESSAGE,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  name: "",
  email: "",
  errorMessage: "",
};

export default function signin(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        name: action.userName,
        email: action.userEmail,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        name: "",
        email: "",
      };
    case SET_USERNAME:
      return {
        ...state,
        name: action.name,
      };
    case ERROR_INPUT_HANDLER:
      return {
        ...state,
        errorMessage: action.message,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
}
