import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class PasswordService extends DataService {
  public change(password: string): Observable<Response<Boolean>> {
    return super.put<Response<Object>>(`api/password/change`, { password: password }).map((data) => {
      return new Response<Boolean>(data);
    }, e => { 
      return Observable.of(new Response(e));
    });
  }

  public reset(email: string): Observable<Response<Boolean>> {
    return super.post<Response<Object>>(`api/password/reset/${email}`, { }).map((data) => {
      return new Response<Boolean>(data);
    }, e => { 
      return Observable.of(new Response(e));
    });
  }
}
