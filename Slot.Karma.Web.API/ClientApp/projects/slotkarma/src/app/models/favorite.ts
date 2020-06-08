import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import { SlotMachine } from './slot.machine';
import * as moment from 'moment';


//@dynamic
export class Favorite extends Model {
  @map({ name: 'id', convert: null })
  @serialize({to: 'id'})
  public id: number = null;
    
  @map({ name: 'userId', convert: null })
  @serialize({to: 'UserId'})
  public userID: number = null;

  @map({ name: 'slotMachineId', convert: null })
  @serialize({to: 'SlotMachineId'})
  public slotMachineID: number = null;

  @map({ name: 'slotMachine', convert: function (value, scope) { return value ? new SlotMachine(value) : new SlotMachine({});} })
  public slotMachine: SlotMachine = null;
  
  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
