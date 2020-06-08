import {Component, ElementRef, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { PassportService } from '../../services/passport.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from '../../models/user';
import { Types } from '../../models/types';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {  
  public date = new FormControl(new Date());
  @ViewChild('form', {static: false})
  public form: NgForm;
  
  public Types = Types;
  public user: User = new User({username:'', gender: 'M'});

  constructor(public route: ActivatedRoute, public router: Router, private title: Title, private authorizationGuard : AuthorizationGuard, private passportService : PassportService) {
    this.title.setTitle('My Profile');
    this.user = authorizationGuard.user;
  }


  public favorites() { 
    this.router.navigate(['profile', 'edit', 'favorites']);
  }
  public changePassword() { 
    this.router.navigate(['profile', 'edit', 'password']);
  }
  public edit() { 
    this.router.navigate(['profile', 'edit']);
  }
  public history() { 
    this.router.navigate(['profile', 'history']);
  }

  public logout() { 
    this.passportService.logout().subscribe(u => { 
      location.assign('login');
      //this.router.navigate(['login']);
    })
  }

}
