import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { SlotMachineEvent } from '../../../models/slot.machine.event';
import { SlotMachine } from '../../../models/slot.machine';
import { SlotMachineService } from '../../../services/slot.machine.service';
import { SlotMachineEventService } from '../../../services/slot.machine.event.service';
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})

export class HistoryComponent implements OnInit {
  public selected: SlotMachineEvent = new SlotMachineEvent({});
  public slotMachineEvents: Array<SlotMachineEvent> = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    public slotMachineEventService: SlotMachineEventService,
    public slotMachineService: SlotMachineService,
    private authorizationGuard: AuthorizationGuard,
    private loadingService: LoadingService,
    private messageService: MessageService) {
    this.title.setTitle('Karma History');
  }

  public select(item: SlotMachineEvent) { 
    this.selected = item;   
    this.selected = item;   
    this.loadingService.setLoading(true);
    this.slotMachineService.select(item.slotMachine.id).subscribe(data => {
      let slot = new SlotMachine(data.object);
      this.loadingService.setLoading(false);
      this.authorizationGuard.user.casino = slot.casino;
      this.authorizationGuard.user.selectedMachine = slot;
      this.router.navigate(['slot', this.selected.slotMachine.id]);
    }, err => {
      this.loadingService.setLoading(false);
    });
  }

  public ngOnInit() { 
    this.load({ skip: 0, take: 10, orderby: '', dir: '', keyword: '' });
  }

  public load(params) { 
    this.loadingService.setLoading(true);
    this.slotMachineEventService.history(params).subscribe((data) => {
      this.loadingService.setLoading(false);
      this.slotMachineEvents = data.object.map(e => new SlotMachineEvent(e));
    },
    err => {
      this.loadingService.setLoading(false);
    });  
  }
}
