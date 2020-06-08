import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { Favorite } from '../../../models/favorite';
import { FavoriteService } from '../../../services/favorite.service'
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';
import { SlotMachine } from '../../../models/slot.machine';
import { SlotMachineService } from '../../../services/slot.machine.service';

@Component({
  selector: 'favorites',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.less']
})

export class FavoriteComponent {

  public selected = new Favorite({ });
  public favorites: Array<Favorite> = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private favoriteService: FavoriteService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private slotMachineService: SlotMachineService,
    private authorizationGuard: AuthorizationGuard) {
    this.title.setTitle('Favorites');
    this.load();
  }

  public load() { 
    this.loadingService.setLoading(true);
    this.favoriteService.list({ skip: 0, take: 1000, orderby: '', dir: '', keyword: '' }).subscribe((data) => {
      this.loadingService.setLoading(false);
      this.favorites = data.object.map(s => new Favorite(s));
    }, e => {
      this.loadingService.setLoading(false);
    });    
  }

  public delete(item) { 
    this.loadingService.setLoading(true);
    this.favoriteService.remove(item.id).subscribe((data) => {
      this.loadingService.setLoading(false);            
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
      this.load();
    },
    e => {
      this.loadingService.setLoading(false);            
      this.messageService.add({severity:'error', summary:'Error', detail: e.error.message});
    });
  }

  public select(item: Favorite) { 
    this.selected = item;   
    this.loadingService.setLoading(true);
    this.slotMachineService.select(item.slotMachineID).subscribe(data => {
      let slot = new SlotMachine(data.object);
      this.loadingService.setLoading(false);
      this.authorizationGuard.user.casino = slot.casino;
      this.authorizationGuard.user.selectedMachine = slot;
      this.router.navigate(['slot', slot.id]);
    }, err => {
      this.loadingService.setLoading(false);
    });
  }
}
