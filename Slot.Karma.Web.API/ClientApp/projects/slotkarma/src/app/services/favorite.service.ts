import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { SlotMachine } from '../models/slot.machine';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class FavoriteService extends DataService {
  public add(id: number): Observable<Response<SlotMachine>> {
    return super.post<Response<SlotMachine>>(`api/favorite/${id}`, {}).map((data) => {
      return new Response<SlotMachine>(data);
    });
  }
  
  public remove(id : number): Observable<Response<SlotMachine>> {
    return super.delete<Response<SlotMachine>>(`api/favorite`, id).map((data) => {
      return new Response<SlotMachine>(data);
    });
  }

  public list(params): Observable<Response<Array<SlotMachine>>> {
    return super.get<Response<Array<SlotMachine>>>(`api/favorite/list`, params).map((data) => {
      return new Response<Array<SlotMachine>>(data);
    });    
  }

}
