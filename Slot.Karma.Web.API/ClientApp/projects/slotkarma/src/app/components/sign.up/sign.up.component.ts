import {Component, ElementRef, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker'
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from '../../models/user';
import { Types } from '../../models/types';
import { UserService } from '../../services/user.service';
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';
import * as moment from 'moment';

@Component({
  selector: 'signup',
  templateUrl: './sign.up.component.html',
  styleUrls: ['./sign.up.component.less']
})
export class SignupComponent {  
  public dob: Date = null;
  public date = new FormControl(new Date());
  @ViewChild('form', {static: false})
  public form: NgForm;
  
  public Types = Types;
  public user: User = new User({username:'', gender: 'M', dob: null});

  constructor(public route: ActivatedRoute, public router: Router, private title: Title, private userService: UserService, private loadingService: LoadingService,  private messageService : MessageService) {
    this.title.setTitle('Sign up');
  }

  public submit() { 
    this.loadingService.setLoading(true);
    this.userService.create(this.user).subscribe((data) => {
      this.loadingService.setLoading(false);            
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
      this.router.navigate(['login']);
    },
    e => {
      this.loadingService.setLoading(false);            
      this.messageService.add({severity:'error', summary:'Error', detail: e.error.message});
    });
  }

  public onClickDatePicker(event) {

  }

  public onDateChange(event : MatDatepickerInputEvent<Date>) { 
    this.user.dob = event.value;
  }  
}
