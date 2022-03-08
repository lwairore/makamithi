import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialMediaFormatHttpResponse, SocialMediaHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { convertItemToString, isObjectEmpty } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  listSocialMedia$() {
    const API = environment.baseURL +
      environment.socialMedia.rootURL +
      environment.socialMedia.socialMedia.listSocialMedia();

    return this._httpClient.get<Array<SocialMediaHttpResponse>>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS = details.map(detail => {
            const FORMATTED_DETAIL: SocialMediaFormatHttpResponse = {
              title: convertItemToString(detail.title),
              link: convertItemToString(detail.link),
              icon: convertItemToString(detail.icon),
            };

            return FORMATTED_DETAIL;

          }).filter(detail => !isObjectEmpty(detail));

          return FORMATTED_DETAILS;
        }))

  }
}
