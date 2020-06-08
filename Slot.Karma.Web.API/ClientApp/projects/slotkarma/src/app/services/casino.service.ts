import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { Casino } from '../models/casino';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class CasinoService extends DataService {
  public read(params: any): Observable<Response<Array<Casino>>> {
    return super.get<Response<Array<Casino>>>(`api/casino/list`, params).map((data) => {
      return new Response(data);
    });
  }  

  public select(id: number): Observable<Response<Casino>> {
    return super.put<Response<Casino>>(`api/casino/select/${id}`, {}).map((data) => {
      return new Response(data);
    });
  }  

}
