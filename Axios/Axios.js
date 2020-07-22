import Axios from "axios";

export default Axios.create({
  baseURL: "https://www.nbrb.by/api/exrates/",
});
