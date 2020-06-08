import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'terms-conditions',
  templateUrl: './terms.conditions.component.html',
  styleUrls: ['./terms.conditions.component.less']
})
export class TermsConditionsComponent {


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private location: Location) {
    this.title.setTitle('Terms and Conditions');
  }

  public submit() { 
    this.location.back();
  }

}
