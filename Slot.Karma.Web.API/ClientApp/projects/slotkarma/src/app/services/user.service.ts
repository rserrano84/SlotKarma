import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { User } from '../models/user';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class UserService extends DataService {
  public read(id: string): Observable<Response<User>> {
    return super.get<User>(`api/user/whois/${id}`, {}).map((data) => {
      return new Response<User>(data);
    });
  }  

  public update(user: User): Observable<Response<User>> {
    return super.put<Response<User>>(`api/user`, user.serialize()).map((data) => {
      return new Response<User>(data);
    });
  }  

  public create(user: User): Observable<Response<User>> {
    return super.post<Response<User>>(`api/user`, user.serialize()).map((data) => {
      return new Response<User>(data);
    });
  }  

  public accept(): Observable<Response<User>> { 
    return super.put<Object>(`api/user/accept`, {}).map((data) => {
      return new Response<User>(data);
    }); 
  }
}
