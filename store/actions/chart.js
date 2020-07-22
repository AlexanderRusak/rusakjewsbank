import Axios from "../../Axios/Axios";
import { USD, EUR, RUB } from "../../API/CurrenciesId";
import {
  SET_USD_DATA,
  SET_EUR_DATA,
  SET_RUB_DATA,
  CHART_START,
  CHART_SUCCESS,
  CHART_ERROR,
} from "./actionTypes";
function axiosFetchLink(cur_id, start, end) {
  return Axios.get(
    `Rates/Dynamics/${cur_id}?startDate=${start}&endDate=${end}`
  );
}
export function fetchDataChart(startDate, endDate) {
  return async (dispatch) => {
    dispatch(chartStart());
    try {
      await axiosFetchLink(EUR, startDate, endDate).then((resultEur) => {
        dispatch(setEur(resultEur.data));
      });
      await axiosFetchLink(USD, startDate, endDate).then((resultUsd) => {
        dispatch(setUsd(resultUsd.data));
      });
      await axiosFetchLink(RUB, startDate, endDate).then((resultRub) => {
        dispatch(setRub(resultRub.data));
      });

      dispatch(chartSuccess());
    } catch (err) {
      dispatch(chartError(err));
    }
  };
}

export function setUsd(usd) {
  return {
    type: SET_USD_DATA,
    usdData: usd,
  };
}
export function setEur(eur) {
  return {
    type: SET_EUR_DATA,
    eurData: eur,
  };
}
export function setRub(rub) {
  return {
    type: SET_RUB_DATA,
    rubData: rub,
  };
}
export function chartStart() {
  return {
    type: CHART_START,
  };
}
export function chartSuccess() {
  return {
    type: CHART_SUCCESS,
  };
}
export function chartError(error) {
  return {
    type: CHART_ERROR,
    error,
  };
}
