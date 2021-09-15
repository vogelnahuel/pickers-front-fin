import moment from "moment";
export const ISO8601toDDMMYYYHHMM = (value) =>{
    let date = new Date(value); 
    date.setHours(date.getHours() - 3);
    const DDMMYYYY= moment(date.toISOString().slice(0, 10)).format("DD/MM/YYYY");
    const dateHHMM = (date.toISOString().slice(11, 16))
    return DDMMYYYY+" "+dateHHMM;
  }