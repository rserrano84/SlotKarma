import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../../../services/user.service';
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { User } from '../../../models/user';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'accept-login',
  templateUrl: './accept.login.component.html',
  styleUrls: ['./accept.login.component.less']
})
export class AcceptLoginComponent { 
  public 
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private userService: UserService,
    private authorizationGuard: AuthorizationGuard) {
    this.title.setTitle('Accept Terms');
  }

  public submit() { 
    this.loadingService.setLoading(true);
    this.userService.accept().subscribe((data) => {      
      this.loadingService.setLoading(false);            
      this.authorizationGuard.user = new User(data.object);
      this.authorizationGuard.user.accepted = true;
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
      this.router.navigate(['casino']);
    },
    e => {
      this.loadingService.setLoading(false);            
      this.messageService.add({severity:'error', sticky: true, summary:'Error', detail: e.error.message});
    });
  }

  public back() {
    this.router.navigate(['login']);
  }

}
