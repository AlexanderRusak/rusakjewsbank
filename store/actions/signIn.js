import Axios from "axios";
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  ERROR_INPUT_HANDLER,
  CLEAR_MESSAGE,
} from "./actionTypes";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  EMAIL_NOT_FOUND,
} from "../../errorMessages";

export default function signIn(email, password) {
  return async (dispatch) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let response = null;
    try {
      response = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzNr9NyuiagPw6ZxKYVdWm12y38yhIj5o",
        authData
      );
      const signInUser = response.data.localId;

      const fireBaseData = await Axios.get(
        "https://rusakjewsbank-32815.firebaseio.com/users.json"
      ).catch((err) => {
        console.log(err);
      });

      const userData = [];
      for (const dataBaselength in fireBaseData.data) {
        if (fireBaseData.data[dataBaselength].id === signInUser) {
          userData.push(fireBaseData.data[dataBaselength]);
        }
      }

      const data = response.data;
      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userName", userData[0].name);
      localStorage.setItem("userEmail", userData[0].email);
      dispatch(authSuccess(data.idToken, userData[0].name, userData[0].email));
      dispatch(autoLogout(data.expiresIn));
    } catch (err) {
      dispatch(clearMessage());
      const errorMessage = err.response.data.error.errors[0].message;

      switch (errorMessage) {
        case INVALID_EMAIL:
          return dispatch(errorInputHandler("Неверная почта или пароль"));
        case INVALID_PASSWORD:
          return dispatch(errorInputHandler("Неправильная почта или пароль"));
        case EMAIL_NOT_FOUND:
          return dispatch(errorInputHandler("Пользователь не зарегестрирован"));
        default:
          return dispatch(errorInputHandler("Пользователь не зарегестрирован"));
      }
    }
  };
}
export function authSuccess(token, userName, userEmail) {
  return {
    type: AUTH_SUCCESS,
    token,
    userName,
    userEmail,
  };
}
export function errorInputHandler(message) {
  return {
    type: ERROR_INPUT_HANDLER,
    message,
  };
}
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  return {
    type: AUTH_LOGOUT,
  };
}
export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}
export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userName, userEmail));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
export function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
  };
}
