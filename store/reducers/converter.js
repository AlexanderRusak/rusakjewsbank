import {
  FETCH_CURRENCIES_START,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_ERROR,
} from "../actions/actionTypes";

const initialState = {
  currenciesData: [],
  loading: true,
  error: null,
};

export default function currencyConverter(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENCIES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CURRENCIES_SUCCESS:
      return {
        ...state,
        loading: false,
        currenciesData: action.currenciesData,
      };
    case FETCH_CURRENCIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.fetchError,
      };
      
    default:
      return state;
  }
}
