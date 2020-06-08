import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { SlotMachineEvent } from '../../../models/slot.machine.event';
import { SlotMachineEventService } from '../../../services/slot.machine.event.service';
import { LoadingService } from 'common-library';

@Component({
  selector: 'slot-machine-event',
  templateUrl: './slot.machine.event.component.html',
  styleUrls: ['./slot.machine.event.component.less']
})

export class SlotMachineEventComponent {
  public _slotMachineEvent = new SlotMachineEvent({});
  public get slotMachineEvent(): SlotMachineEvent { 
    return this._slotMachineEvent;
  }
  @Input()
  public set slotMachineEvent(value: SlotMachineEvent) { 
    this._slotMachineEvent = value;
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    public slotMachineEventService: SlotMachineEventService,
    private loadingService: LoadingService,
    public authorizationGuard: AuthorizationGuard) {
    
    this.title.setTitle('Slot Machine Event');
    this.route.params.subscribe(params => {
      if (params.sid != null && params.eid != null) {
        this.title.setTitle(`Slot Machine Event: ${this.authorizationGuard.user.selectedMachine.name}`);
        this.loadingService.setLoading(true);
        this.slotMachineEventService.read(params.eid).subscribe((data) => {
          this.loadingService.setLoading(false);            
          this.slotMachineEvent = new SlotMachineEvent(data.object);
        },
        err => {
          this.loadingService.setLoading(false);            
        });
      }
    });
  }

  public play() { 
    this.router.navigate(['slot',this.authorizationGuard.user.selectedMachine.id, 'play'])
  }

  public change() { 
    this.router.navigate(['slot']);
  }

  public close() { 
    this.router.navigate(['slot',this.authorizationGuard.user.selectedMachine.id])
  }


}
