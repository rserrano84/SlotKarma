import {Component, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { Offer } from '../../models/offer';
import { OfferService } from '../../services/offer.service'
import { LoadingService } from 'common-library';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.less']
})
export class OfferComponent implements AfterViewInit {
  public selected = new Offer({});
  public offers: Array<Offer> = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    public offerService:
      OfferService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private authorizationGuard: AuthorizationGuard) {   
  }


  public ngAfterViewInit() { 
    this.load();
  }
  
  public load() { 
    this.title.setTitle('Offers');
    this.loadingService.setLoading(true);
    this.offerService.list(this.authorizationGuard.user.casino.id, { skip: 0, take: 10, orderby: '', dir: '', keyword: '' }).subscribe((data) => {
      this.loadingService.setLoading(false);
      this.offers = data.object.map(s => new Offer(s));
    }, e => {
      this.loadingService.setLoading(false);
    });
  }
  public select(item: Offer) { 
    this.selected = item;   
  }
}
