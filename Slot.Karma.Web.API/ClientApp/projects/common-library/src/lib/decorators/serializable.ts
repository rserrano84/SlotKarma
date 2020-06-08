export interface Serializable { 
    serialize(): string;
  }
  
  export class SerializeProperty {
    public to?: string = null;
    public from?: string = null;
    public convert?: Function = null;
    public ignoreEmpty?: boolean = false;
    public ignore? : boolean = false;
  }