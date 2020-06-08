import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { MenuItem } from 'primeng/api';
import { SearchResult } from '../../models/search.result';
import { SearchService } from '../../services/search.service';
import { LoadingService } from 'common-library';
import { Types } from '../../models/types';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})

export class SearchComponent {
  public menuItems: Array<MenuItem> = Types.searchMenuItems;

  public selected: SearchResult = new SearchResult({});
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    public searchService: SearchService,
    public authorizationGuard: AuthorizationGuard,
    private loadingService: LoadingService) {
    this.menuItems.forEach((item, index) => { 
      item.command = (e) => this.search(e);
    });
    this.title.setTitle('Search');
  }

  public search(event) { 
    this.router.navigate(['search', event.item.id])
  }
}
