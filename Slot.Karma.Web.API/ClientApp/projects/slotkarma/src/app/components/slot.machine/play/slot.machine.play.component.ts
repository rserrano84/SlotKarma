import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { SlotMachineEvent } from '../../../models/slot.machine.event';
import { Control } from 'common-library';
import { SlotMachineEventService } from '../../../services/slot.machine.event.service';
import * as moment from 'moment';

@Component({
  selector: 'slot-machine-play',
  templateUrl: './slot.machine.play.component.html',
  styleUrls: ['./slot.machine.play.component.less']
})

export class SlotMachinePlayComponent {
  public elapsed: number = 0;
  public elaspedMessage: string = '';
  public _slotMachineEvent = new SlotMachineEvent({});
  public get slotMachineEvent(): SlotMachineEvent { 
    return this._slotMachineEvent;
  }
  @Input()
  public set slotMachineEvent(value: SlotMachineEvent) { 
    this._slotMachineEvent = value;
  }

  public control = Control;
  private _state: Control = Control.Play;
  @Output('stateChange') stateEmitter: EventEmitter<Control> = new EventEmitter<Control>();
  public get state(): Control { return this._state;}
  @Input()
  public set state(value: Control) {
    this._state = value;
    this.stateEmitter.emit(value);
  }


  constructor(public route: ActivatedRoute, public router: Router, public slotMachineEventService: SlotMachineEventService, public authorizationGuard: AuthorizationGuard) {
    this.slotMachineEventService.slotMachineEvent = new SlotMachineEvent({});
    this.slotMachineEvent = this.slotMachineEventService.slotMachineEvent;
    if (this.state == Control.Play) { 
      this.slotMachineEvent.start = new Date();      
    }
    this.elaspedMessage = moment.utc(0).format('HH:mm:ss');    
    setInterval(function () {  
      if (this.state == Control.Play) {
        this.elapsed = moment.duration((moment(new Date()).diff(moment(this.slotMachineEventService.slotMachineEvent.start))));
      }
      this.elaspedMessage = moment.utc(this.elapsed.asMilliseconds()).format('HH:mm:ss');//`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
    }.bind(this), 1000);
  }

  public change() { 
    this.router.navigate(['home'])
  }

  public play() { 
    this.state = Control.Play;
    this.slotMachineEvent.start = new Date();
    this.stateEmitter.emit(this.state);
  }

  public pause() { 
    this.state = Control.Pause;
    this.stateEmitter.emit(this.state);
  }

  public stop() { 
    this.state = Control.Record;
    this.stateEmitter.emit(this.state);
    this.router.navigate(['slot',this.authorizationGuard.user.selectedMachine.id, 'record'])
  }

}
