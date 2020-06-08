import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientXsrfModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlatformModule } from '@angular/cdk/platform';
import { MatButtonToggleModule, MatIconModule } from '@angular/material';
// Angular Material
import { MatNativeDateModule }from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
/*import { MatAutocompleteModule } from '@angular/material/autocomplete';*/
import { MatInputModule } from '@angular/material/input'

//NGPrime
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { 
  OwlDateTimeModule, 
  OwlNativeDateTimeModule,
  DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE
} from 'ng-pick-datetime';
//import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
//import { OWL_MOMENT_DATE_TIME_FORMATS } from 'ng-pick-datetime-moment';
import { MessageService } from 'primeng/components/common/messageservice';

//Components:
import { CommonLibraryModule } from 'common-library';
import { AcceptLoginComponent } from './components/login/accept/accept.login.component';
import { AppComponent } from './app.component';
import { CasinoComponent } from './components/casino/casino.component';
import { FavoriteComponent } from './components/profile/favorite/favorite.component';
import { ForgotLoginComponent } from './components/login/forgot/forgot.login.component';
import { HistoryComponent } from './components/profile/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not.found/not.found.component';
import { OfferComponent } from './components/offer/offer.component';
import { PrivacyPolicyComponent } from './components/privacy.policy/privacy.policy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile/edit/profile.edit.component';
import { ProfileEditPasswordComponent } from './components/profile/edit/password/profile.edit.password.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search/results/search.results.component';
import { SignupComponent } from './components/sign.up/sign.up.component';
import { SlotMachineComponent } from './components/slot.machine/slot.machine.component';
import { SlotMachineEventComponent } from './components/slot.machine/event/slot.machine.event.component';
import { SlotMachinePlayComponent } from './components/slot.machine/play/slot.machine.play.component';
import { SlotMachineRecordComponent } from './components/slot.machine/record/slot.machine.record.component';
import { TermsConditionsComponent } from './components/terms.conditions/terms.conditions.component';

import { VerifySignupComponent } from './components/sign.up/verify/verify.sign.up.component';

//Guards
import { AuthorizationGuard } from './guards/authorization.guard';

// Interceptors
import { ResponseInterceptor } from './util/interceptors/response.interceptor';

// Services
import { CasinoService } from './services/casino.service';
import { FavoriteService } from './services/favorite.service';
import { OfferService } from './services/offer.service';
import { PassportService } from './services/passport.service';
import { PasswordService } from './services/password.service';
import { SearchService } from './services/search.service';
import { SlotMachineEventService } from './services/slot.machine.event.service';
import { SlotMachineService } from './services/slot.machine.service';
import { UserService } from './services/user.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const SERVICES = [
  //{ provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},
  //{ provide: OWL_DATE_TIME_FORMATS, useValue: OWL_MOMENT_DATE_TIME_FORMATS },
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  CasinoService,
  FavoriteService,
  MessageService,
  OfferService,
  PassportService,
  PasswordService,
  SearchService,
  SlotMachineEventService,
  SlotMachineService,
  UserService
];
const GUARDS = [
  AuthorizationGuard
];
const COMPONENTS = [
  AcceptLoginComponent,
  AppComponent,
  CasinoComponent,
  FavoriteComponent,
  ForgotLoginComponent,
  HistoryComponent,
  HomeComponent,
  LoginComponent,
  NavigationComponent,
  NotFoundComponent,
  OfferComponent,
  PrivacyPolicyComponent,
  ProfileComponent,
  ProfileEditComponent,
  ProfileEditPasswordComponent,
  SearchComponent,
  SearchResultsComponent,
  SignupComponent,
  SlotMachineComponent,
  SlotMachineEventComponent,
  SlotMachinePlayComponent,
  SlotMachineRecordComponent,
  TermsConditionsComponent,
  VerifySignupComponent
];
const PIPES = [
];
const DIRECTIVES = [
];

const PRIMNG = [
  AutoCompleteModule,
  DropdownModule,
  GrowlModule,
  MenubarModule,
  MessageModule,
  MessagesModule,
  OwlDateTimeModule, 
  OwlNativeDateTimeModule,
  PanelMenuModule,
  RadioButtonModule,
  ToastModule
];
const MATERIAL = [
  /*MatInputModule,
  MatAutocompleteModule,*/
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatIconModule
];

export function csrfCookieStrategy() {
  return new HttpClientXsrfModule();
}

@NgModule({
  providers: [
    ...SERVICES,
    ...GUARDS
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  imports: [
    ...MATERIAL,
    ...PRIMNG,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonLibraryModule,
    FormsModule,
    HttpClientModule,
    PlatformModule,
    ReactiveFormsModule,
    ScrollingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
