import { SerializeProperty } from './serializable';

/**
 * 
 * @param  property Property object used to map and convert json data to a object property.
 */
export function serialize(property: SerializeProperty) {
  return function (target: any, propertyKey: string | symbol) {
    if (!property.to) {
      property.to = propertyKey.toString();
    }
    property.from = propertyKey.toString();
    target.serializables.push(property); 
  } 
}
