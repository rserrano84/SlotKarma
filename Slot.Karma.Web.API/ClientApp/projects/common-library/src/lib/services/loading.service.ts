import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


/**
 * LoadingService is used to broadcast something loading using Observables.
 *
 */
@Injectable()
export class LoadingService {
  private loadingSubject = new Subject<boolean>();

  /**
   * Notify observers that something is loading.
   */
  public setLoading(value: boolean) {this.loadingSubject.next(value);}

  /**
   * A loading change observable. Allows components to subscribe to loading changes.
   * @returns An observable
   */
  public onLoadingChange(): Observable<boolean> { return this.loadingSubject.asObservable(); }

}
