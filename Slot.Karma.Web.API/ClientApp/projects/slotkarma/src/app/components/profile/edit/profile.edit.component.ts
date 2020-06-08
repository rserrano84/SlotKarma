import {Component, ElementRef, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker'
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { User } from '../../../models/user';
import { Types } from '../../../models/types';

import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { UserService } from '../../../services/user.service';
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'profile-edit',
  templateUrl: './profile.edit.component.html',
  styleUrls: ['./profile.edit.component.less']
})
export class ProfileEditComponent {  
  public date = new FormControl(new Date());
  @ViewChild('form', {static: false})
  public form: NgForm;
  
  public Types = Types;
  public user: User = new User({username:'', gender: 'M'});

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private userService: UserService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private location: Location,
    private authorizationGuard: AuthorizationGuard) {
    this.title.setTitle('Edit Profile');
    this.user = authorizationGuard.user;
  }

  public submit() { 
    this.loadingService.setLoading(true);
    this.userService.update(this.user).subscribe((data) => {
      this.loadingService.setLoading(false);            
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
    },
    e => {
      this.loadingService.setLoading(false);            
      this.messageService.add({severity:'error', summary:'Error', detail: e.error.message});
    });

  }

  public cancel() { 
    this.location.back();
  }

  public onDateChange(event : MatDatepickerInputEvent<Date>) { 
    this.user.dob = event.value;
  }  

}
