import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaSectionFormatHttpResponse, AreaSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse, PartnerFormatHttpResponse, PartnerHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToString, isObjectEmpty } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

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


  retrievePartnerAreaSection$() {
    const API = environment.baseURL +
      environment.partner.rootURL +
      environment.partner.partnerAreaSection;

    return this._httpClient.get<AreaSectionHttpResponse>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
          }

          return FORMATTED_DETAILS;
        }))
  }

  listPartner$() {
    const API = environment.baseURL +
      environment.partner.rootURL +
      environment.partner.listPartner;

    return this._httpClient.get<Array<PartnerHttpResponse>>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = details.map(detail => {
            const formattedDetail: PartnerFormatHttpResponse = {
              title: convertItemToString(detail.title),
              link: convertItemToString(detail.link),
              image: this._formatShowcaseItemWithPhoto(detail.image),
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        })
      )
  }

}
