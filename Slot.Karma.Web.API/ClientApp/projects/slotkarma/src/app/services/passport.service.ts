import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { User } from '../models/user';
import { discardPeriodicTasks } from '@angular/core/testing';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class PassportService extends DataService {

  public login(username: string, password: string): Observable<Response<boolean>> {
    let data: FormData = new FormData();
    data.append("username", username);
    data.append("password", password);
    return super.post<Response<boolean>>(`api/passport/login`, data).map((data) => {
      return new Response<boolean>(data);
    });
  }  

  public whomai(): Observable<Response<User>> {
    return super.get<Response<User>>(`api/passport/whoami`, {}).map((data) => {
      return new Response<User>(data);
    });
  }  

  public logout(): Observable<Response<User>> {
    return super.post<Response<User>>(`api/passport/logout`, { }).map((data) => {
      return new Response<User>(data);
    });
  }  

  public signup(user: User): Observable<Response<User>> {
    return super.post<Response<User>>(`api/passport`, user).map((data) => {
      return new Response<User>(data);
    });
  }  

  public verify(email: string): Observable<Response<boolean>> {
    return Observable.of(new Response({object: true, message: ''}));
  }  

}
