import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { SlotMachine } from '../../models/slot.machine';
import { SlotMachineService } from '../../services/slot.machine.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoadingService } from 'common-library';
import { Util } from 'common-library';
import { Subject } from 'rxjs';
import { switchMap, startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit{
  public Util = Util;
  
  public record = new SlotMachine({});
  public slotMachine = new SlotMachine({});
  public slotMachines: Array<SlotMachine> = new Array<SlotMachine>();
  private keyword$: Subject<string> = new Subject<string>();
  public keyword: string = '';

  public newMachine = new SlotMachine({});

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private slotMachineService: SlotMachineService,
    public authorizationGuard: AuthorizationGuard) {
    
    this.title.setTitle('Welcome to Slot Karma');
    this.record = this.authorizationGuard.user.selectedMachine && this.authorizationGuard.user.selectedMachine.id ? new SlotMachine(this.authorizationGuard.user.selectedMachine) : new SlotMachine({});
    this.keyword$.pipe(
      startWith(null),
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.slotMachineService.list(this.authorizationGuard.user.casino.id, {skip: 0, take: 10, orderby: '', dir: '', keyword: value }).subscribe((data) => {
          this.slotMachines = data.object.map(s => new SlotMachine(s));
        });
      }
    })
  }

  public ngOnInit() { 
    this.slotMachine = this.authorizationGuard.user.selectedMachine ? this.authorizationGuard.user.selectedMachine : this.slotMachine;
  }

  public submit() { 
    this.loadingService.setLoading(true);
    this.slotMachineService.select(this.slotMachine.id).subscribe(data => {
      this.loadingService.setLoading(false);
      this.authorizationGuard.user.selectedMachine = new SlotMachine(data.object);
      this.router.navigate(['slot', this.authorizationGuard.user.selectedMachine.id]);
    }, err => {
      this.loadingService.setLoading(false);
    });
  }

  public loadSlotMachines(event) {     
    this.keyword = (event.query || '').toLowerCase();
    this.keyword$.next(this.keyword);
  }

  public onSelectSlotMachine(value: SlotMachine) {
    this.slotMachine = value;    
  }  

  public onFocus(event) { 
    event.currentTarget.select();
  }  

  public save() { 
    this.loadingService.setLoading(true);
    this.slotMachineService.create(this.newMachine).subscribe((data) => {
      this.loadingService.setLoading(false);            
      this.messageService.add({ severity: 'success', summary: '', detail: data.message });
      this.authorizationGuard.user.selectedMachine = new SlotMachine(data.object);
      this.router.navigate(['slot', this.authorizationGuard.user.selectedMachine.id]);
    },
    e => {
      this.loadingService.setLoading(false);            
      this.messageService.add({severity:'error', summary:'Error', detail: e.error.message});
      });
  }

}
