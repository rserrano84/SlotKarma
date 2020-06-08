import { MapProperty } from './mappable';

/**
 * 
 * @param  property Property object used to map and convert json data to a object property.
 */
export function map(property: MapProperty) {
  return function (target: any, propertyKey: string | symbol) {
    if (!property.to) {
      property.to = propertyKey.toString();
    }
    property.from = property.name;
    property.name = property.name || property.to;
    target.mappings.push(property); 
  } 
}
