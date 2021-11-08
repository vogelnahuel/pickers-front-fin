import moment from "moment";
import { DATE_FORMATS } from "./constants";
export const ISO8601toDDMMYYYHHMM = (value) => {
  let date = new Date(value);
  date.setHours(date.getHours() - 3);
  const DDMMYYYY = moment(date.toISOString().slice(0, 10)).format(
    DATE_FORMATS.shortDate
  );
  const dateHHMM = date.toISOString().slice(11, 16);
  return DDMMYYYY + " " + dateHHMM;
};
