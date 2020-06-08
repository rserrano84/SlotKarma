import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, Route, RouterStateSnapshot, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user'
import { PassportService } from '../services/passport.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

//@dynamic
@Injectable()
export class AuthorizationGuard implements CanActivate, CanActivateChild, CanLoad {
  public user: User = new User({});
  constructor(private router: Router, private passportService: PassportService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isLoggedIn();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isLoggedIn();
  }

  canLoad(route: Route): Observable<boolean> {
    return this.isLoggedIn();
  }


  isLoggedIn(): Observable<boolean> { 
    return this.user && this.user.id ? Observable.of(true) : this.get().map(u => { return this.user && u.id ? true : false });
  }
  
  get(): Observable<User> { 
    if (this.user && this.user.id) { return Observable.of(this.user); }
    return this.passportService.whomai().map(data => {
      return this.user = new User(data.object);
    }, err => { 
      this.router.navigate(['login']);
    }).catch(e => { 
      this.router.navigate(['login']);
      return Observable.of(this.user);
    });
  }
}