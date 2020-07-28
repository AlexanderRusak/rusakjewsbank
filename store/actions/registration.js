import {
  ERROR_INPUT_HANDLER,
  CLEAR_MESSAGE,
  REGISTRATION_SUCCESS,
} from "./actionTypes";
import Axios from "axios";
import { EMAIL_EXISTS } from "../../errorMessages";

export function registration(email, password, name) {
  return async (dispatch) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const response = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzNr9NyuiagPw6ZxKYVdWm12y38yhIj5o",
        authData
      );
      console.log(response);
      const data = {
        name,
        email,
        id: response.data.localId,
        feedback: " ",
      };

      await Axios.post(
        "https://rusakjewsbank-32815.firebaseio.com/users.json",
        data
      ).catch((err) => console.log(err));
      dispatch(clearMessage());
      dispatch(registrationSuccess("Пользователь успешно зарегестрирован"));
    } catch (err) {
      dispatch(clearMessage());
      const errorMessage = err.response.data.error.errors[0].message || null;
      errorMessage === EMAIL_EXISTS &&
        dispatch(errorInputHandler("Пользователь уже существует"));
    }
  };
}

export function errorInputHandler(message) {
  return {
    type: ERROR_INPUT_HANDLER,
    message,
  };
}
export function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
  };
}
export function registrationSuccess(message) {
  return {
    type: REGISTRATION_SUCCESS,
    message,
  };
}
