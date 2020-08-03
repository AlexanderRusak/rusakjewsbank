import { combineReducers } from "redux";
import converter from "./converter";
import chart from "./chart";
import registration from "./registration";
import signIn from "./signIn";
import feedback from "./feedback";
export default combineReducers({
  converter: converter,
  chart: chart,
  registration: registration,
  signIn: signIn,
  feedback: feedback,
});
