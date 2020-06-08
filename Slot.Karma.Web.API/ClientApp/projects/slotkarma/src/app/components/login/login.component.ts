import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';
import { PassportService } from '../../services/passport.service';
import { UserService } from '../../services/user.service';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { User } from '../../models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {  
  @ViewChild('form', {static: false})
  public form: NgForm;
  @ViewChild('usernameInput', { static: false })
  public usernameInputEl: ElementRef = null;
  
  public user: User = new User({username:''});
  public _acceptTerms: boolean = false;
  public get acceptTerms(): boolean { 
    return this._acceptTerms;
  }
  public set acceptTerms(value: boolean) { 
    this._acceptTerms = value;
    this.title.setTitle(value ? 'Accept Terms': 'Login');
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private passportService: PassportService,
    private userService: UserService,
    public authorizationGuard: AuthorizationGuard) {
    this.acceptTerms = false;
  }

  public showPassword() { 
    this.usernameInputEl.nativeElement.type = this.usernameInputEl.nativeElement.type==='text' ? 'password' : 'text';
  }

  public submit() { 
    this.loadingService.setLoading(true);
    this.passportService.login(this.user.email, this.user.password).subscribe((user) => {
      this.loadingService.setLoading(false);
      this.passportService.whomai().subscribe(u => { 
        this.authorizationGuard.user = new User(u.object);
        if (this.authorizationGuard.user.accepted) {
          this.router.navigate(['casino']);
        }
        else { 
          this.router.navigate(['login', 'accept']);
        }
      })

    },
    e => {
      this.loadingService.setLoading(false);
      this.messageService.add({severity:'error', sticky: true, summary:'Error', detail: e.error.message});
    });

    console.log(`login(${this.user.username}, ${this.user.password})`)
  }

  public signup() {
    this.router.navigate(['signup']);
  }

  public forgot() {
    this.router.navigate(['login', 'forgot']);
  }

}
