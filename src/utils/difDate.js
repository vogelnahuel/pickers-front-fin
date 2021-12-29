import moment from "moment";
import { DATE_FORMATS } from "./constants";

export default function getDifDate(date) {
  var regDate = moment();
  var actualDate = moment(date, DATE_FORMATS.fullISODate).subtract(3, "hours");
  return regDate.diff(actualDate, "days");
}
