import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import { Casino } from './casino';
import * as moment from 'moment';


//@dynamic
export class SlotMachine extends Model {
  @map({ name: 'id', convert: null })
  @serialize({to: 'id'})
  public id: number = 0;
    
  @map({ name: 'number', convert: null })
  @serialize({ to: 'number', convert: function (value, scope) { return value + '';}})
  public number: string = null;

  @map({ name: 'name', convert: null })
  @serialize({to: 'name'})
  public name: string = '';

  //@map({ name: 'date', convert: function (value, scope) { return value + ''; } })
  //@serialize({ to: 'Created'})
  //public date: string = null;

  @map({
    name: 'created', convert: function (value, scope) {
      return new Date(moment.utc(value).local().format('YYYY/MM/DD hh:mm:ss A'));
    }
  })
  @serialize({ to: 'created', convert: null })
  public created: Date = null;

  @map({ name: 'description', convert: null })
  @serialize({to: 'description'})
  public description: string = '';

    
  @map({ name: 'casino', convert: function (value, scope) { return value ? new Casino(value) : new Casino({});} })
  public casino: Casino = new Casino({});
  
  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
