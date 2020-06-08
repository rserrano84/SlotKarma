import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import * as moment from 'moment';
import { SlotMachine } from './slot.machine';
import { Address } from './address';

//@dynamic
export class Casino extends Model {
  @map({ name: 'id', convert: null })
  public id: number = 0;
 
  @map({ name: 'name', convert: null })
  public name: string = '';

  @map({ name: 'address1', convert:  null})
  public address1: string = '';

  @map({ name: 'address2', convert:  null})
  public address2: string = '';

  @map({ name: 'city', convert:  null})
  public city: string = '';

  @map({ name: 'state', convert:  null})
  public state: string = '';

  @map({ name: 'zip', convert:  null})
  public zip: string = '';

  @map({ name: 'latitude', convert: null })
  public latitude: number = 0.0;

  @map({ name: 'longitude', convert: null })
  public longitude: number = 0.0;
  
  @map({
    name: 'slotMachines', convert: function (value, scope) { 
      return value.map((s : SlotMachine) => new SlotMachine(s));
  }})
  public slotMachines: Array<SlotMachine> = [];
  

  public checkedIn: boolean = false;
  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
