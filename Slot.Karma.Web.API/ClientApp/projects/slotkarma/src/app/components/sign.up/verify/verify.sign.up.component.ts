import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';
import { PassportService } from '../../../services/passport.service';
import { User } from '../../../models/user';

@Component({
  selector: 'verify-signup',
  templateUrl: './verify.sign.up.component.html',
  styleUrls: ['./verify.sign.up.component.less']
})
export class VerifySignupComponent {  
  @ViewChild('form', {static: false})
  public form: NgForm;
  @ViewChild('usernameInput', { static: false })
  public usernameInputEl: ElementRef = null;
  
  public user: User = new User({username:''});

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private passportService: PassportService) {
    this.title.setTitle('Verify');
  }

  public submit() { 
    this.loadingService.setLoading(true);
    this.passportService.verify(this.user.email).subscribe((data) => {
      this.loadingService.setLoading(false);            
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
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
