import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaSectionFormatHttpResponse, AreaSectionHttpResponse, ClientReviewFormatHttpResponse, ClientReviewHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToString } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientSliderService {

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

  listClientReview$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.listClientReview;

    return this._httpClient.get<Array<ClientReviewHttpResponse>>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS = details.map(detail => {
            const FORMATTED_DETAIL: ClientReviewFormatHttpResponse = {
              fullName: convertItemToString(detail.full_name),
              review: convertItemToString(detail.review),
              position: convertItemToString(detail.position),
              image: this._formatShowcaseItemWithPhoto(detail.image),
            }

            return FORMATTED_DETAIL;
          })
          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        })
      )
  }

  retrieveClientReviewSection$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.retrieveClientReviewSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            summary: convertItemToString(details.summary),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
          }

          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        })
      )
  }
}
