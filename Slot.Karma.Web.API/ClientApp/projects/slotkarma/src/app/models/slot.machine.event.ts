import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import { User } from './user';
import { SlotMachine } from './slot.machine';
import { Types } from './types';
import * as moment from 'moment';

//@dynamic
export class SlotMachineEvent extends Model {
  @map({ name: 'id', convert: null })
  @serialize({to: 'id', convert: null})
  public id: number = 0;
    
  @map({
    name: 'start', convert: function (value, scope) { 
      return new Date(moment.utc(value).local().format('YYYY/MM/DD hh:mm:ss A'));    
  } })
  @serialize({to: 'start', convert: null})
  public start: Date =null;

  @map({
    name: 'end', convert: function (value, scope) { 
      return new Date(moment.utc(value).local().format('YYYY/MM/DD hh:mm:ss A'));    
  } })
  @serialize({to: 'end'})
  public end: Date =null;

  @map({ name: 'description', convert: null })
  @serialize({to: 'description', convert: null})
  public description: string = '';


  @map({
    name: 'type', convert: function (value, scope) { 
      if (value != null && value < Types.winTypes.length) { 
        scope.typeName = Types.winTypes.find(t=>t.id==value).name;
      }
      return value;
  } })
  @serialize({to: 'type', convert: null})
  public type: number = Types.winTypes[0].id;
  public typeName: string = Types.winTypes[0].name;
  
  @map({ name: 'net', convert: function (value, scope) { return scope.type==3 ? value*-1 : value} })
  @serialize({
    to: 'net', convert: function (value, scope) {
      value = value || 0;
      return typeof value == 'string' ? Number.parseInt(value.replace(',','')) : value
    }
  })
  public net: number = null;

  @map({ name: 'user', convert: function (value, scope) { return new User(value || {}); } })
  public user: User = new User({});

  @map({ name: 'slotMachine', convert: function (value, scope) { return new SlotMachine(value || {}); } })
  public slotMachine: SlotMachine = new SlotMachine({});

  @map({name: 'elapsed', convert: null})
  @serialize({
    to: 'elapsed', convert: function (value, scope) {
      
      return moment.duration((moment(scope.end).diff(moment(scope.start)))).asMinutes();
    }
  })
  public elapsed: number = null;

  
  
  public get time(): string {
    alert(this.elapsed);
    return this.elapsed!=null ? moment.utc(this.elapsed).format('HH:mm:ss') : null;
  }
  
  public get hours(): string {
    return moment.duration((moment(this.end).diff(moment(this.start)))).asHours().toFixed(2);
  }

  @map({ name: 'playCount', convert: null })
  @serialize({ to: 'playCount' })
  public playCount: number = null;



  public get Playtime(): string {
    return this.playCount != null ? moment.utc(this.playCount).format('HH:mm:ss') : null;
  }

  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
