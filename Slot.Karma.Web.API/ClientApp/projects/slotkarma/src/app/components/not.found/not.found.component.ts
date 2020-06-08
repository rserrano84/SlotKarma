import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'not-found',
  templateUrl: './not.found.component.html',
  styleUrls: ['./not.found.component.less']
})
export class NotFoundComponent {

  constructor(public route: ActivatedRoute, public router: Router, private title: Title) {
    this.title.setTitle('Not Found');
  }

}
