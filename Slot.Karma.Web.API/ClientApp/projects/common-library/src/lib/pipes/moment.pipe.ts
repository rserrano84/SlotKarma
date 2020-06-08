import { Pipe, PipeTransform } from '@angular/core';
import { Util } from '../util/util'
import moment from 'moment';

/** 
 * Example:
 * {{value | moment:'MM/DD/YYYY'}} 
*/
@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {
  transform(value: string | Date, format): string {
    return value ? moment(value).format(format) : '';
  }
}

@Pipe({ name: 'momentutc' })
export class MomentUTCPipe implements PipeTransform {
  transform(value: string | Date, format): string {
    return value ? moment.utc(value).local().format(format) : '';
  }
}
