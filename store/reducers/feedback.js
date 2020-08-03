import {FEEDBACK_SEND} from "../actions/actionTypes";

const initialState = {
  feedbackMessage: "",
};
export default function feedback(state = initialState, action) {
  switch (action.type) {
    case FEEDBACK_SEND:
      return {
        ...state,
        feedbackMessage: action.message,
      };
    default:
      return {
        ...state,
      };
  }
}
