import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { SlotMachine } from '../../models/slot.machine';
import { SlotMachineEvent } from '../../models/slot.machine.event';
import { User } from '../../models/user';
import { Control } from 'common-library';
import { SlotMachineEventService } from '../../services/slot.machine.event.service'
import { FavoriteService } from '../../services/favorite.service'
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'slot-machine',
  templateUrl: './slot.machine.component.html',
  styleUrls: ['./slot.machine.component.less']
})

export class SlotMachineComponent {

  public slotMachine = new SlotMachine({ });
  public slotMachineEvent = new SlotMachineEvent({ });

  public selected = new SlotMachineEvent({});
  private counter = 0;
  public slotMachineEvents: Array<SlotMachineEvent> = [];

  constructor(public route: ActivatedRoute, public router: Router, private title: Title, public slotMachineEventService : SlotMachineEventService, private favoriteService: FavoriteService, private loadingService: LoadingService, private messageService: MessageService, private authorizationGuard : AuthorizationGuard) {
    this.title.setTitle('Slot Machine');
    this.route.params.subscribe(params => {
      if (params.sid != null) {
        this.slotMachine = this.authorizationGuard.user.selectedMachine;
        this.title.setTitle(`Slot Machine ${this.slotMachine.name}`);
        this.loadingService.setLoading(true);
        this.slotMachineEventService.list(params.sid, { skip: 0, take: 10, orderby: '', dir: '', keyword: '' }).subscribe((data) => {
          this.loadingService.setLoading(false);            
          this.slotMachineEvents = data.object.map(s=>new SlotMachineEvent(s));
        }, e => { 
          this.loadingService.setLoading(false);            
        });
      }
    });
  }

  public play() { 
    this.router.navigate(['slot', this.authorizationGuard.user.selectedMachine.id, 'play'])
  }
  public change() { 
    this.router.navigate(['slot'])
  }

  public favorite() { 
    this.loadingService.setLoading(true);
    this.favoriteService.add(this.slotMachine.id).subscribe((data) => {
      this.loadingService.setLoading(false);            
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
    },
    e => {
      this.loadingService.setLoading(false);            
      this.messageService.add({severity:'error', summary:'Error', detail: e.error.message});
    });
  }

  public select(item: SlotMachineEvent) { 
    this.selected = item;   
    this.router.navigate(['slot', this.authorizationGuard.user.selectedMachine.id, 'event', item.id]);
  }
}
