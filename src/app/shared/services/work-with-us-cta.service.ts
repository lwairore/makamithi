import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaSectionFormatHttpResponse, AreaSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToString } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WorkWithUsCtaService {

  constructor(private _httpClient: HttpClient,) { }

  private _formatShowcaseItemWithPhoto(
    photo?: ItemPreviewHttpResponse) {
    const formattedPhoto: ItemPreviewFormatHttpResponse = {
      alt: convertItemToString(photo?.caption),
      src: constructMediaSrc(photo?.image),
    }

    return formattedPhoto;
  }

  retrieveWorkWithUsCtaSection$() {
    const API = environment.baseURL +
      environment.contactUs.rootURL +
      environment.contactUs.retrieveWorkWithUsCtaSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            description: convertItemToString(details.description),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
            callToAction: convertItemToString(details.call_to_action),
          }

          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        })
      )
  }
}
