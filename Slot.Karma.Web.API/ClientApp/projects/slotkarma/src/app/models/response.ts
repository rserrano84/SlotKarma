import { Model } from 'common-library';
import { map } from 'common-library';
import { serialize } from 'common-library';

//@dynamic
export class Response<T> extends Model {
  @map({ name: 'status', convert: null })
  public status: number = null;
    
  @map({ name: 'message', convert: null })
  public message: string = null;

  @map({ name: 'obj', convert: null })
  public object: T;
    
  @map({ name: 'total', convert: null })
  public total: number = null;

  constructor(data: any = {}) {
    super(data);
    this.map();
  }
}
