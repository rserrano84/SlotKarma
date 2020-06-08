export interface Mappable { 
    map(): void;
  }
  
  export class MapProperty {
    public name: string = null;
    public to?: string = null;
    public from?: string = null;
    public convert: Function = null;
  }