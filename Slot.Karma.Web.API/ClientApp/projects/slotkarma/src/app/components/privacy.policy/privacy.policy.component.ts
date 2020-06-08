import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy.policy.component.html',
  styleUrls: ['./privacy.policy.component.less']
})
export class PrivacyPolicyComponent {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private location: Location) {
    this.title.setTitle('Privcy and Policy');
  }

  public submit() { 
    this.location.back();
  }
}
