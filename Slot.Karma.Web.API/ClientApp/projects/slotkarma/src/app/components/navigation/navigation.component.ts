import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { User } from '../../models/user';
import { MenuItem } from 'primeng/api';
import { SlotMachineEventService } from '../../services/slot.machine.event.service'
import { SlotMachineEvent } from '../../models/slot.machine.event';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {  
  public user: User = new User({});
  public items: MenuItem[] = []

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public slotMachineEventService: SlotMachineEventService,
    public authorizationGuard: AuthorizationGuard) {
  }

  public ngOnInit() {
    this.user = this.authorizationGuard.user;
  }

  public edit() { 
    this.router.navigate(['slot', this.authorizationGuard.user.selectedMachine.id, 'anonymous', 'record'])
  }
  public slot() { 
    this.router.navigate(['slot']);
  }
  public casino() {   
    this.router.navigate(['casino']);
  }
  public search() { 
    this.router.navigate(['search']);
  }
  public profile() { 
    this.router.navigate(['profile']);
  }
  public offers() { 
    this.router.navigate(['offers']);
  }
}
