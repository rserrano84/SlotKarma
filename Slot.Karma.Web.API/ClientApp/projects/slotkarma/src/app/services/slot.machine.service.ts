import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { SlotMachine } from '../models/slot.machine';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class SlotMachineService extends DataService {
  public read(casinoID : number, id: string): Observable<Response<SlotMachine>> {
    return super.get<Response<SlotMachine>>(`api/slotmachine/${id}`, {}).map((data) => {
      return new Response<SlotMachine>(data);
    });
  }
  
  public list(casinoID: number, params): Observable<Response<Array<SlotMachine>>> {
    return super.get<Response<Array<SlotMachine>>>(`api/slotmachine/list/${casinoID}`, params).map((data) => {
      return new Response<Array<SlotMachine>>(data);
    });    
  }

  public select(id: number): Observable<Response<SlotMachine>> {
    return super.put<Response<SlotMachine>>(`api/slotmachine/select/${id}`, {}).map((data) => {
      return new Response<SlotMachine>(data);
    });
  }

  public create(slotMachine: SlotMachine): Observable<Response<SlotMachine>> {
    return super.post<Response<SlotMachine>>(`api/slotmachine`, slotMachine).map((data) => {
      return new Response<SlotMachine>(data);
    });
  }

}
