import Axios from "../../Axios/Axios";
import { GENERAL_CURRENCIES } from "../../API/CurrenciesId";
import {
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_ERROR,
  FETCH_CURRENCIES_START,
} from "./actionTypes";

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(fetchCurrenciesStart());
    try {
      const currenciesData = [
        {
          name: "BYN",
          value: 1,
          official_name: "Белорусский рубль",
        },
      ];
      Axios.get(GENERAL_CURRENCIES)
        .then((response) => {
          Object.entries(response.data).map((item) => {
            const {
              Cur_Abbreviation,
              Cur_OfficialRate,
              Cur_Name,
              Cur_Scale,
            } = item[1];

            currenciesData.push({
              name: Cur_Abbreviation,
              value: Cur_OfficialRate / Cur_Scale,
              official_name: Cur_Name,
            });
            return true;
          });
        })
        .then(() => {
          dispatch(fetchCurrenciesSuccess(currenciesData));
        });
    } catch (err) {
      dispatch(fetchCurrenciesError(err));
    }
  };
}
export function fetchCurrenciesStart() {
  return {
    type: FETCH_CURRENCIES_START,
  };
}
export function fetchCurrenciesSuccess(currency) {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    currenciesData: currency,
  };
}
export function fetchCurrenciesError(e) {
  return {
    type: FETCH_CURRENCIES_ERROR,
    fetchError: e,
  };
}
