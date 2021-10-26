import moment from "moment";

export default function getDifDate(date){
    var regDate = moment();
    var actualDate = moment(date, "YYYY-MM-DD hh:mm:ss").subtract(3,'hours');;
    return regDate.diff(actualDate, "days");
  };