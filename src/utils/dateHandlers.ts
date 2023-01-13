import { DateObject } from "../types/basicTypes";

export function getDateList(initialUSDate: string, finalUSDate: string) {

  let loopDate = '00/00/00'

  var date = new Date(initialUSDate);

  var dateAMDArray = new Array();

  while (loopDate !== finalUSDate) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const fullDateAMD = [year, month, day].join('/');
    loopDate = [month, day, year].join('/')

    dateAMDArray.push(fullDateAMD)

    date.setDate(date.getDate() + 1)
  }

  return dateAMDArray
}

export function toDateObject(matchDate: Date): DateObject {
  const matchYear = matchDate.getFullYear() + '';
  const matchMonth = String(matchDate.getMonth() + 1).padStart(2, '0');
  const matchDay = String(matchDate.getDate()).padStart(2, '0');
  return {
    day: matchDay,
    month: matchMonth,
    year: matchYear
  };
}