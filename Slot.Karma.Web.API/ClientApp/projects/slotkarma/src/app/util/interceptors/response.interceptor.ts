import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response } from '../../models/response';

//@dynamic
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body) {
          let response = event.body;
          if (response.status === 401 || response.status === 403) {
          }
          
        }
      };
      return event;
    })
    .catch((err: any, caught) => {
      if (err instanceof HttpErrorResponse) {
        err = Object.assign(err, { error: new Response(err.error || {}) });   
        if ((err.status === 401 || err.status === 403)&& (!location.href.includes('login'))) {
          location.assign(`login`);
        }
        return throwError(err);
      }
    });
  }
}