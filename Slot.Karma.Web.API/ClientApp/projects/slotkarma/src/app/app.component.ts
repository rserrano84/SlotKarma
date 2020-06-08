import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Event, NavigationStart, NavigationCancel, NavigationError, NavigationEnd, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { Growl } from 'primeng/components/growl/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoadingService } from 'common-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('growl', { static: false })
  public growl: Growl;

  private _isLoading: Boolean = false;
  public get isLoading(): Boolean {
    return this._isLoading;
  }
  public set isLoading(value: Boolean) {
    this._isLoading = value;
  }

  constructor(public router: Router, public messageService: MessageService, private changeDetector: ChangeDetectorRef, private loadingService: LoadingService) {
    this.loadingService.onLoadingChange().subscribe(value => {
      this.isLoading = value;
      changeDetector.detectChanges();
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.setLoading(true);
        this.messageService.clear();
      }
      if (event instanceof NavigationEnd) {
        this.loadingService.setLoading(false);
        this.messageService.clear();
      }
      if (event instanceof NavigationCancel) {
        this.loadingService.setLoading(false);
        this.messageService.clear();
      }
      if (event instanceof NavigationError) {
        this.loadingService.setLoading(false);
        this.messageService.clear();
      }
    });

  }

}
