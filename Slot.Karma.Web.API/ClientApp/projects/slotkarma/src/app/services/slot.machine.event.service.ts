import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { SlotMachineEvent } from '../models/slot.machine.event';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class SlotMachineEventService extends DataService {
  public slotMachineEvent: SlotMachineEvent = new SlotMachineEvent({start: new Date('2019-11-01 3:00'), end: new Date('2019-11-01 5:25')});

  public read(id: string): Observable<Response<SlotMachineEvent>> {
    return super.get<Response<SlotMachineEvent>>(`api/slotmachineevent/${id}`, {}).map((data) => {
      return new Response<SlotMachineEvent>(data);
    });
  }
  
  public list(id: string, params: any): Observable<Response<Array<SlotMachineEvent>>> {
    return super.get<Response<Array<SlotMachineEvent>>>(`api/slotmachineevent/list/${id}`, params).map((data) => {
      return new Response<Array<SlotMachineEvent>>(data);
    });
  }

  public create(id: number, slotMachineEvent: SlotMachineEvent): Observable<Response<SlotMachineEvent>> {
    return super.post<Response<SlotMachineEvent>>(`api/slotmachineevent/${id}`, slotMachineEvent.serialize()).map((data) => {
      return new Response<SlotMachineEvent>(data);
    });
  }

  public anonymous(id: number, slotMachineEvent: SlotMachineEvent): Observable<Response<SlotMachineEvent>> {
    return super.post<Response<SlotMachineEvent>>(`api/slotmachineevent/anonymous/${id}`, slotMachineEvent.serialize()).map((data) => {
      return new Response<SlotMachineEvent>(data);
    });
  }

  public history(params: any): Observable<Response<Array<SlotMachineEvent>>> {
    return super.get<Response<Array<SlotMachineEvent>>>(`api/slotmachineevent/history`, params ).map((data) => {
      return new Response<Array<SlotMachineEvent>>(data);
    });
  }
}
