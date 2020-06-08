import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { SearchResult } from '../../../models/search.result';
import { SearchService } from '../../../services/search.service';
import { LoadingService } from 'common-library';
import { SlotMachine } from '../../../models/slot.machine';
import { SlotMachineService } from '../../../services/slot.machine.service';
import { MenuItem } from 'primeng/api';
import { Types } from '../../../models/types';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'search-results',
  templateUrl: './search.results.component.html',
  styleUrls: ['./search.results.component.less']
})

export class SearchResultsComponent implements OnInit {
  public header: string = 'Top 10';
  public selected: SearchResult = new SearchResult({});
  public searchResults: Array<SearchResult> = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    public searchService: SearchService,
    public authorizationGuard: AuthorizationGuard,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private slotMachineService: SlotMachineService) {
    this.title.setTitle('Search');
  }

  public select(item: SearchResult) { 
    this.loadingService.setLoading(true);
    this.slotMachineService.select(item.slotMachineId).subscribe(data => {
      this.loadingService.setLoading(false);
      this.authorizationGuard.user.selectedMachine = new SlotMachine(data.object);
      this.router.navigate(['slot', this.authorizationGuard.user.selectedMachine.id]);
    }, err => {
      this.loadingService.setLoading(false);
    });
  }

  public ngOnInit() { 
    this.route.params.subscribe(params => {
      if (params.type != null) {
        let item: MenuItem = Types.searchMenuItems.find(item => item.id == params.type);
        if (item) {
          this.header = item.label;
          this.title.setTitle(item.label);
          this.load(item.queryParams);
        }
      }
    });
  }

  public load(params) { 
    this.loadingService.setLoading(true);
    this.searchService.list(this.authorizationGuard.user.casino.id, params).subscribe((data) => {
      this.loadingService.setLoading(false);
      this.searchResults = data.object.map(e => new SearchResult(e));
    },
    err => {
      this.loadingService.setLoading(false);
    });  
  }
}
