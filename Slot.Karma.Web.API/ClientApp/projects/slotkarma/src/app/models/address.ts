import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';
import * as moment from 'moment';

//@dynamic
export class Address extends Model {
  @map({ name: 'address1', convert: null })
  public address1: string = '';
    
  @map({ name: 'address2', convert: null })
  public address2: string = '';

  @map({ name: 'city', convert: null })
  public city: string = '';

  @map({ name: 'state', convert: null })
  public state: string = '';

  @map({ name: 'zip', convert: null })
  public zip: string = '';

  @map({ name: 'country', convert: null })
  public country: string = '';

  @map({ name: 'latitude', convert: null })
  public latitude: number = 0.0;

  @map({ name: 'longitude', convert: null })
  public longitude: number = 0.0;

  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
