import {
  SET_USD_DATA,
  SET_RUB_DATA,
  SET_EUR_DATA,
  CHART_START,
  CHART_SUCCESS,
  CHART_ERROR,
} from "../actions/actionTypes";

const initialState = {
  data: [],
  chartLoading: true,
  status: "",
  usd: [],
  eur: [],
  rub: [],
  chartError: null,
};

export default function Chart(state = initialState, action) {
  switch (action.type) {
    case SET_USD_DATA:
      return {
        ...state,
        usd: action.usdData,
      };
    case SET_EUR_DATA:
      return {
        ...state,
        eur: action.eurData,
      };
    case SET_RUB_DATA:
      return {
        ...state,
        rub: action.rubData,
      };
    case CHART_START:
      return {
        ...state,
        chartLoading: true,
      };
    case CHART_SUCCESS:
      return {
        ...state,
        chartLoading: false,
      };
    case CHART_ERROR:
      return {
        ...state,
        chartLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
