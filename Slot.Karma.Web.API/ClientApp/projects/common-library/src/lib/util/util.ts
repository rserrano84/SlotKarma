import moment from 'moment';

//@dynamic
export class Util {
  /**
   * True is the specified object isEmpty; otherwise, false.
   * @param value
   */
  public static isEmpty(object: Object | String) : boolean { 
    return object === '' || object === null || (object instanceof Object && Object.keys(object).length === 0) || (object instanceof Array && object.length === 0);
  }

  /** 
   * Returns a global unique identifer 
  */
  public static guid() { return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/1|0/g, function () { return (0 | Math.random() * 16).toString(16).toUpperCase() }) }
  
  public static get greeting() : String { 
    const hour = moment().hour();
    return (hour >= 12 && hour <= 17) ? "Good Afternoon," : (hour <= 24 ? 'Good Evening,' : 'Good Morning');
  }

  public static formattedDecimal(value: number, locale: string = "en-US", decimal: number = 0): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
      style: 'decimal'
    }).format(value);
  }  
}

export enum Control {
  Null = "",
  Play = "Playing",
  Pause = "Paused",
  Stop = "Stopped",
  Record = "Record",
}

