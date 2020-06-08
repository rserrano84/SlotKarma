import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker'
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from '../../../../models/user';
import { AuthorizationGuard } from '../../../../guards/authorization.guard';
import { PasswordService } from '../../../../services/password.service';
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'profile-edit-password',
  templateUrl: './profile.edit.password.component.html',
  styleUrls: ['./profile.edit.password.component.less']
})
export class ProfileEditPasswordComponent {
  public date = new FormControl(new Date());
  @ViewChild('form', { static: false })
  public form: NgForm;
  public user: User = new User({});

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private passwordService: PasswordService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private location: Location,
    private authorizationGuard: AuthorizationGuard) {
    this.title.setTitle('Change Password');
    this.user = authorizationGuard.user;
  }

  public submit() {
    this.loadingService.setLoading(true);
    this.passwordService.change(this.user.password).subscribe((data) => {
      this.loadingService.setLoading(false);            
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
      this.router.navigate(['profile'])
    },
    e => {
      this.loadingService.setLoading(false);            
      this.messageService.add({severity:'error', summary:'Error', detail: e.error.message});
    });
  }

  public cancel() { 
    this.location.back();
  }
}
