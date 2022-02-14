import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from '@sharedModule/custom-types';
import { SiteBreadcrumbDetailsFormatHttpResponse } from '@sharedModule/custom-types/site-breadcrumb-details-format-http-response';
import { SiteBreadcrumbDetailsHttpResponse } from '@sharedModule/custom-types/site-breadcrumb-details-http-response';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToString } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteBreadcrumbService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  private _formatShowcaseItemWithPhoto(
    photo?: ItemPreviewHttpResponse) {
    const formattedPhoto: ItemPreviewFormatHttpResponse = {
      alt: convertItemToString(photo?.caption),
      src: constructMediaSrc(photo?.image),
    }

    return formattedPhoto;
  }


  retrieveSiteBreadcrumbDetails$() {
    const API = environment.baseURL +
      environment.siteBreadcrumb.rootURL +
      environment.siteBreadcrumb.retrieveSiteBreadcrumbDetails;

    return this._httpClient.get<SiteBreadcrumbDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: SiteBreadcrumbDetailsFormatHttpResponse = {
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }
}
