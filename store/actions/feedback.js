import {FEEDBACK_SEND} from "./actionTypes";

export default function feedbackMessage(message) {
  return {
    type: FEEDBACK_SEND,
    message,
  };
}
