import { Serializable, SerializeProperty } from '../decorators/serializable';
import { serialize } from '../decorators/serialize.decorator';
import { Mappable, MapProperty } from '../decorators/mappable';
import { Util } from '../util/util'
export class Model implements Serializable, Mappable {
  private _mappings: Array<MapProperty>;
  private _serializables: Array<SerializeProperty>;

  /**
  * Any property decorated with @map will be stored in this array.
  * for example, the json propery classStart will be mapped to classStartDate and converted into a date:
  *   @map({ name: 'classStart', convert: function (value) { return new Date(value ? value.replace(/-/g, '/') : 0); } })
  *   public classStartDate: Date = new Date();

  */
  protected get mappings(): Array<MapProperty> { return this._mappings || (this._mappings = new Array<MapProperty>()); }
  protected get serializables(): Array<SerializeProperty> { return this._serializables || (this._serializables = new Array<SerializeProperty>()); }

  /**
  * The data initially passed into the consructor. 
  */
  @serialize({ignore:true})
  public _data: any
  public parent: any;
  constructor(data: any = {}, parent: Model = null) {
    this.parent = parent;
    this._data = data;
  }

  public copy(data: any = {}) { 
    this._data = data;
    this.map();    
  }

  /**
   * Maps a model's property to another and/or converts the property's value.
   * This must be called in the constructor of a derived class.  Unfortunately, TypeScript
   * does not initialize the base class variables before the base class constructor is called.
  */
  public map() {
    if (this._mappings) {
      for (let property of this._mappings) {
        let names = property.name.replace(/\s+/g, '').split(',');
        for (const name of names) {
          if (this._data.hasOwnProperty(name)) {
            if (!this.hasOwnProperty(property.to)) {
              Object.defineProperty(this, property.to, {
                writable: true,
                enumerable: true,
                value: property.convert ? property.convert((this._data[name]), this) : (this._data[name])
              });
            }
            else {
              this[property.to] = property.convert ? property.convert((this._data[name]), this) : (this._data[name]);
            }
          }
        }  
      }
    }
  }

  public serialize(): any { 
    let obj : Object = new Object();
    if (this._serializables) {
      for (let property of this._serializables) {
        if (this.hasOwnProperty(property.from) && property.ignore !== true) {
          let value = this[property.from] instanceof Object && this[property.from].serialize ? this[property.from].serialize() : (property.convert ? property.convert((this[property.from]), this) : (this[property.from]));
          if (!(property.ignoreEmpty && Util.isEmpty(value))) {
          let o = Object.defineProperty(obj, property.to, {
            writable: true,
            enumerable: true,
            value: value
          });
            if (obj[property.from] instanceof Array) {
              for (let i = 0; i < this[property.from].length; ++i) {
                if (this[property.from][i].serialize) {
                  obj[property.to][i] = this[property.from][i].serialize();
                }
              };
            }
          }
        }
      }
    }
    return obj;
  }
}



