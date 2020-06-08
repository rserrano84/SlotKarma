import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';

import { AcceptLoginComponent } from './components/login/accept/accept.login.component';
import { CasinoComponent } from './components/casino/casino.component';
import { FavoriteComponent } from './components/profile/favorite/favorite.component';
import { ForgotLoginComponent } from './components/login/forgot/forgot.login.component';
import { HistoryComponent } from './components/profile/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
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
import { VerifySignupComponent } from './components/sign.up/verify/verify.sign.up.component';
import { TermsConditionsComponent } from './components/terms.conditions/terms.conditions.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/casino', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },  
  { path: 'login/accept', component: AcceptLoginComponent },  
  { path: 'login/forgot', component: ForgotLoginComponent },  
  { path: 'signup', component: SignupComponent },
  { path: 'signup/verify', component: VerifySignupComponent },
  { path: 'offers', component: OfferComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthorizationGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthorizationGuard] },
  { path: 'profile/edit/favorites', component: FavoriteComponent, canActivate: [AuthorizationGuard] },
  { path: 'profile/edit/password', component: ProfileEditPasswordComponent, canActivate: [AuthorizationGuard] },
  { path: 'profile/history', component: HistoryComponent, canActivate: [AuthorizationGuard] },
  { path: 'slot', component: HomeComponent, canActivate: [AuthorizationGuard] },  
  { path: 'casino', component: CasinoComponent, canActivate: [AuthorizationGuard] },  
  { path: 'search', component: SearchComponent, canActivate: [AuthorizationGuard] },
  { path: 'search/:type', component: SearchResultsComponent, canActivate: [AuthorizationGuard] },
  { path: 'slot/:sid', component: SlotMachineComponent, canActivate: [AuthorizationGuard] },
  { path: 'slot/:sid/play', component: SlotMachinePlayComponent, canActivate: [AuthorizationGuard] },
  { path: 'slot/:sid/record', component: SlotMachineRecordComponent, canActivate: [AuthorizationGuard] },
  { path: 'slot/:sid/anonymous/record', component: SlotMachineRecordComponent, canActivate: [AuthorizationGuard] },
  { path: 'slot/:sid/event/:eid', component: SlotMachineEventComponent, canActivate: [AuthorizationGuard] },
  { path: 'terms', component: TermsConditionsComponent },
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
