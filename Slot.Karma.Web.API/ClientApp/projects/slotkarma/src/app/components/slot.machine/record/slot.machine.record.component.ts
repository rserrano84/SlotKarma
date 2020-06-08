import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OwlDateTimeComponent } from 'ng-pick-datetime'
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker'
import { AuthorizationGuard } from '../../../guards/authorization.guard';
import { SlotMachineEvent } from '../../../models/slot.machine.event';
import { Types } from '../../../models/types';
import { SlotMachineEventService } from '../../../services/slot.machine.event.service'
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';
import { Control } from 'common-library';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'slot-machine-record',
  templateUrl: './slot.machine.record.component.html',
  styleUrls: ['./slot.machine.record.component.less']
})

export class SlotMachineRecordComponent implements OnInit {
  public Types = Types;
  public time = new moment();
  public date = new FormControl(new Date());
  @ViewChild('datePicker', { static: false }) datepicker: MatDatepicker<Date>;
  public aWhileAgo: boolean = false;

  public _slotMachineEvent = new SlotMachineEvent({});
  public get slotMachineEvent(): SlotMachineEvent {
    return this._slotMachineEvent;
  }
  @Input()
  public set slotMachineEvent(value: SlotMachineEvent) {
    this._slotMachineEvent = value;
  }

  public isAnonymous: boolean = false;
  public selectedValue: number=0;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public slotMachineEventService: SlotMachineEventService,
    private messageService: MessageService,
    private loadingService: LoadingService,
    public authorizationGuard: AuthorizationGuard) {
  }

  public ngOnInit() {
    this.selectedValue = 1;
    this.slotMachineEvent = this.slotMachineEventService.slotMachineEvent || new SlotMachineEvent({ type: 1, start: new Date(), end: new Date() });
    this.route.url.subscribe(segments => {
      this.isAnonymous = segments.find(u => u.path == 'anonymous') != null;
      this.slotMachineEvent = this.isAnonymous ? new SlotMachineEvent({ type: 1, start: new Date(), end: new Date() }) : this.slotMachineEvent;
    });
    this.slotMachineEvent.end = new Date();
    this.date.setValue(this.slotMachineEvent.end);
    this.time = new moment(this.slotMachineEvent.end);
  }

  public record() { 
    this.loadingService.setLoading(true);
    this.slotMachineEventService[this.isAnonymous ? 'anonymous' : 'create'](this.authorizationGuard.user.selectedMachine.id, this.slotMachineEvent).subscribe((data) => {
      this.loadingService.setLoading(false);
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
      this.close();
    },
      e => {
        this.loadingService.setLoading(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
      });
  }

  public close() {
    if (this.authorizationGuard.user.casino && this.authorizationGuard.user.selectedMachine && this.authorizationGuard.user.selectedMachine.id) {
      this.router.navigate(['slot', this.authorizationGuard.user.selectedMachine.id]);
    }
    else {
      this.router.navigate(['home']);
    }
  }

  selectionChanged(id) {
    this.slotMachineEvent.type = id.value;
    console.log("Selected value: " + id.value);
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.slotMachineEvent.end = event.value;
  }
  public onTimeChange(event) {
    this.slotMachineEvent.end.setHours(event.value.getHours());
    this.slotMachineEvent.end.setMinutes(event.value.getMinutes());
    this.date.setValue(this.slotMachineEvent.end);
  }

}
