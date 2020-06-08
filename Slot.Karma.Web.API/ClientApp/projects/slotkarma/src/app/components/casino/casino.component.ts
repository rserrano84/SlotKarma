import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { Casino } from '../../models/casino';
import { Geo } from '../../util/geo';
import { Util } from 'common-library';
import { of, Observable, ObservableLike, Subscription } from 'rxjs';
import { Subject} from 'rxjs';
import { switchMap, startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CasinoService } from '../../services/casino.service';
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';

//@dynamic
@Component({
  selector: 'casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.less']
})
export class CasinoComponent implements OnInit{

  public Util = Util;
  public Geo = Geo;
  public get latitude() { return this.Geo.latitude.toFixed(6);}
  public get longitude() { return this.Geo.longitude.toFixed(6); }
  
  public record : Casino = new Casino({});

  public isSaving: boolean = false;
  
  public casinoControl = new FormControl();
  public casinos: Array<Casino> = new Array<Casino>();
  public nearbyCasinos:Array<Casino> = [];
  private keyword$: Subject<String> = new Subject<String>();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    public authorizationGuard: AuthorizationGuard,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private casinoService: CasinoService) {
    
    this.title.setTitle('Choose a Casino');
    this.keyword$.pipe(
      startWith(null),
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.casinoService.read({ skip: 0, take: 10, orderby: '', dir: '', keyword: value }).subscribe((data) => {
          this.casinos = data.object.map(c => new Casino(c));
        });
      }
    })
  }

  public ngOnInit() { 
    Geo.location();
    this.record = this.authorizationGuard.user.casino ? this.authorizationGuard.user.casino : this.record;
    this.isSaving = false;
  }

  public submit() {
    this.isSaving = true;
    this.loadingService.setLoading(true);
    this.casinoService.select(this.record.id).subscribe(data => {
      this.loadingService.setLoading(false);
      this.authorizationGuard.user.selectedMachine = null;
      this.authorizationGuard.user.casino = new Casino(data.object);
      this.router.navigate(['slot']);
    }, e => {
        this.loadingService.setLoading(false);
        this.messageService.add({severity:'error', sticky: true, summary:'Error', detail: e.error.message});        
    });

  }

  public loadCasinos(event) { 
    this.keyword$.next((event.query || '').toLowerCase());
  }

  public onSelectCasino(value: Casino) { 
    this.record = value;    
  }

  public onFocus(event) { 
    event.currentTarget.select();
  }  
}
