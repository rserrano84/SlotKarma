import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { SearchResult } from '../models/search.result';
import { Response } from '../models/response'

//@dynamic
@Injectable()
export class SearchService extends DataService {  
  public list(id: number, params: any): Observable<Response<Array<SearchResult>>> {
    return super.get<Response<Array<SearchResult>>>(`api/search/list/${id}`, params).map((data) => {
      return new Response<Array<SearchResult>>(data);
    });
  }


}
