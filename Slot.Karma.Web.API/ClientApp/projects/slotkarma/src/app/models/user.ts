import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import * as moment from 'moment';
import { Casino } from './casino';
import { SlotMachine } from './slot.machine';

//@dynamic
export class User extends Model {
  @map({ name: 'id', convert: null })
  @serialize({to: 'id', convert: null})
  public id: number = 0;
    
  @map({ name: 'email', convert: null })
  @serialize({to: 'email', convert: null})
  public email: string = '';

  @map({ name: 'username', convert: null })
  @serialize({to: 'username', convert: null})
  public username: string = '';

  @serialize({to: 'pass', convert: null}) 
  public password: string = null;
  public confirm: string = null;

  @map({ name: 'firstName', convert: null })
  @serialize({to: 'firstName', convert: null})
  public firstName: string = '';
    
  @map({ name: 'lastName', convert: null })
  @serialize({to: 'lastName', convert: null})
  public lastName: string = '';
  
  @map({ name: 'zip', convert: null })
  @serialize({to: 'zip', convert: null})
  public zip: number = null;

  @map({ name: 'gender', convert: null })
  @serialize({to: 'gender', convert: null})
  public gender: string = 'M';

  @map({ name: 'dob', convert: function (value) { return value ? new Date(moment(value).format('YYYY/MM/DD')) : null; } })
  @serialize({to: 'dob'})
  public dob: Date = null;

  @map({ name: 'accepted', convert: function (value, scope) { return value ? true : false;} })
  @serialize({ to: 'accepted', convert: function (value, scope) { return value ? 1 : 0}})
  public accepted: boolean = false;

  @map({ name: 'canContact', convert: function (value, scope) { return value ? true : false;} })
  @serialize({ to: 'canContact', convert: function (value, scope) { return value ? 1 : 0}})
  public canContact: boolean = false;
  
  @map({ name: 'created', convert: function (value) { return value ? new Date(moment(value).format('YYYY/MM/DD')) : null; } })
  public created: Date = null;
  
  @map({ name: 'modified', convert: function (value) { return value ? new Date(moment(value).format('YYYY/MM/DD')) : null; } })
  public modified: Date = null;

  @map({ name: 'expires', convert: null })
  public expires: number = 0;

  @map({ name: 'casino', convert: function (value, scope) { return value ? new Casino(value) : new Casino({});} })
  public casino: Casino = new Casino({});

  @map({ name: 'selectedSlotMachine', convert: function (value, scope) { return value ? new SlotMachine(value) : new SlotMachine({});} })
  public selectedMachine: SlotMachine = new SlotMachine({});
  

  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
