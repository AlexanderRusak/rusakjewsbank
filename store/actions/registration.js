import { ERROR_INPUT_HANDLER, CLEAR_MESSAGE } from "./actionTypes";
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
      const data = { name, email, id: response.data.localId };
      console.log(data);

      await Axios.post(
        "https://rusakjewsbank-32815.firebaseio.com/users.json",
        data
      )
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    } catch (err) {
      dispatch(clearMessage());
      const errorMessage = err.response.data.error.errors[0].message;
      errorMessage === EMAIL_EXISTS &&
        dispatch(
          errorInputHandler("Пользователь с данным email уже существует")
        );
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
