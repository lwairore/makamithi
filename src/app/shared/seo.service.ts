import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SeoDetailsHttpResponse } from './custom-types';
import { retryWithBackoff } from './operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private _httpClient: HttpClient) { }

  retrieveHomeSEODetails$() {
    const API = environment.home.rootURL
      + environment.home.seo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5))
  }
}
