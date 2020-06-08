import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import { Casino } from './casino';
import * as moment from 'moment';


//@dynamic
export class Offer extends Model {
  @map({ name: 'id', convert: null })
  @serialize({to: 'id'})
  public id: number = null;
    
  @map({ name: 'name', convert: null })
  @serialize({to: 'name'})
  public name: string = '';

  @map({ name: 'start', convert: null })
  @serialize({ignore: true})
  public start: Date =null;

  @map({ name: 'end', convert: null })
  @serialize({ignore: true})
  public end: Date = null;
  
  @map({ name: 'description', convert: null })
  @serialize({to: 'description'})
  public description: string = '';

  @map({ name: 'value', convert: null })
  @serialize({to: 'value'})
  public net: number = 0;

  @map({ name: 'image', convert: null })
  @serialize({to: 'image'})
  public image: string = '';  
    
  @map({ name: 'casino', convert: function (value, scope) { return value ? new Casino(value) : new Casino({});} })
  public casino: Casino = new Casino({});
  
  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
