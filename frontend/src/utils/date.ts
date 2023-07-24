import moment from "moment";

export const dateHandler = (date: Date) => {
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate.fromNow(true);

  let dateByHourAndMin = momentDate.format("HH:mm");

  const getDay = () => {
    let days = time.split(" ")[0];
    if (Number(days) <= 7) {
      return now.subtract(Number(days), "days").format("dddd");
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  };

  if (time === "a few seconds") {
    return "Now";
  }

  //check if it finds minute in time
  //exemple a minute or 59 minute ...etc
  if (time.search("minute") !== -1) {
    let mins = time.split(" ")[0];
    if (mins === "a") {
      return "1 min";
    } else {
      return `${mins} min`;
    }
  }

  if (time.search("hour") !== -1) {
    return dateByHourAndMin;
  }

  if (time === "a day") {
    return "Yesterday";
  }

  if (time.search("days") !== -1) {
    return getDay();
  }
  return time;
};
