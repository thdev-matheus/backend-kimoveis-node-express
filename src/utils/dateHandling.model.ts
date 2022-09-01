import { IDateEncoded, IDateDecoded } from "../interfaces/date";

export class DateHandling {
  static dateEncode(date: string, hour: string): IDateEncoded {
    //date: aaaa/mm/dd && hour: hh:mm
    const dateHandling = date.split("/").join("-");
    const dateEnc = new Date(
      `${dateHandling}T${hour.length < 5 ? `0${hour}` : hour}`
    );
    const hourEnc = dateEnc.getTime();
    const weekDay = dateEnc.getDay();

    return {
      dateEnc,
      hourEnc,
      weekDay,
    };
  }

  static dateDecode(date: Date, hour: number): IDateDecoded {
    const fullDate = date.toLocaleDateString().split("/").reverse().join("-");
    const fullHour = new Date(hour).toLocaleTimeString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    });
    const weekDay = date.getDay();

    return {
      date: fullDate,
      hour: fullHour,
      weekDay,
    };
  }

  static isComercialHour(hourEnc: number) {
    const hour = new Date(hourEnc).getHours();
    const minutes = new Date(hourEnc).getMinutes();

    if (hour > 17 || (hour === 17 && minutes > 0) || hour < 8) {
      return false;
    }

    return true;
  }

  static isWeekDay(weekDay: number) {
    if (weekDay === 0 || weekDay === 6) {
      return false;
    }

    return true;
  }
}
