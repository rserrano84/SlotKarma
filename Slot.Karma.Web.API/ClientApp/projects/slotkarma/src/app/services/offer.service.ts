import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { Offer } from '../models/offer';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class OfferService extends DataService {
  public read(casinoID : number, id: string): Observable<Response<Offer>> {
    return super.get<Response<Offer>>(`api/offer/${id}`, {}).map((data) => {
      return new Response<Offer>(data);
    });
  }
  
  public list(casinoID: number, params): Observable<Response<Array<Offer>>> {
    return super.get<Response<Array<Offer>>>(`api/offer/list/${casinoID}`, params).map((data) => {
      return new Response<Array<Offer>>(data);
    }); 
  }

  public select(id: number): Observable<Response<Offer>> {
    return super.put<Response<Offer>>(`api/offer/select/${id}`, {}).map((data) => {
      return new Response<Offer>(data);
    });
  }
}
