import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import { Casino } from './casino';
import * as moment from 'moment';


//@dynamic
export class SearchResult extends Model {
  @map({ name: 'username', convert: null })
  public username: string = null;
    
  @map({ name: 'casinoId', convert: null })
  public casinoId: number = null;

  @map({ name: 'casino', convert: null })
  public casino: string = null;

  @map({ name: 'machineId', convert: null })
  public slotMachineId: number = null;

  @map({ name: 'machine', convert: null })
  public machineName: string = null;

  @map({ name: 'machineTag', convert: null })
  public machineNumber: string = null;
      
  @map({ name: 'sessionDescription', convert: null })
  public description: string = null;

  @map({ name: 'payoutType', convert: null })
  public eventType: number = null;

  @map({ name: 'payout', convert: function (value, scope) { return scope.eventType==3 ? value*-1 : value} })
  public net: number = null;

  @map({ name: 'timesPlayed', convert: null })
  public playCount: string = null;

  @map({ name: 'sessionStart', convert: null })
  public start: Date = null;

  @map({ name: 'sessionEnd', convert: null })
  public end: Date = null;

  @map({ name: 'sessionLength', convert: null })
  public elapsed: number = null;

  public get time(): string { 
    return this.elapsed!=null ? moment.utc(this.elapsed).format('HH:mm:ss') : null;
  }  
  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
