import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SeoDetailsHttpResponse } from './custom-types';
import { retryWithBackoff } from './operators';
import { convertItemToString } from './utilities';
import { ExpectedType, whichValueShouldIUse } from './utilities/which-value-should-i-use.util';

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
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = {
            title: convertItemToString(details.title),
            keywords: convertItemToString(details.keywords),
            description: convertItemToString(details.description),
            image: {
              width: whichValueShouldIUse(details.image?.width, null, ExpectedType.NUMBER),
              height: whichValueShouldIUse(details.image?.height, null, ExpectedType.NUMBER),
              src: convertItemToString(details.image?.image),
              alt: convertItemToString(details.image?.caption),
            },
            type: convertItemToString(details.type),
            author: convertItemToString(details.author),
            section: convertItemToString(details.section),
            published: convertItemToString(details.published),
            modified: convertItemToString(details.modified),
          }

          return formattedDetails;
        })
      )
  }
}
