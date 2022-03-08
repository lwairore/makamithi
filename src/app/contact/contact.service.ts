import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AreaSectionFormatHttpResponse,
  AreaSectionHttpResponse,
  ContactInfoFormatHttpResponse,
  ContactInfoHttpResponse,
  ItemPreviewFormatHttpResponse,
  ItemPreviewHttpResponse,
  PaginatedItemHttpResponse
} from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import {
  constructMediaSrc,
  convertItemToString,
  ExpectedType,
  isANumber,
  whichValueShouldIUse
} from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private _httpClient: HttpClient) { }

  private _formatShowcaseItemWithPhoto(
    photo?: ItemPreviewHttpResponse) {
    const formattedPhoto: ItemPreviewFormatHttpResponse = {
      alt: convertItemToString(photo?.caption),
      src: constructMediaSrc(photo?.image),
    }

    return formattedPhoto;
  }

  sendMessage$(newMessageFormData: FormData) {
    const API = environment.baseURL +
      environment.inbox.rootURL +
      environment.inbox.leaveAMessage;

    return this._httpClient.post(API, newMessageFormData)
      .pipe(
        retryWithBackoff(1000, 5));
  }

  retrieveLeaveUsAMessageSection$() {
    const API = environment.baseURL +
      environment.contactUs.rootURL +
      environment.contactUs.retrieveLeaveUsAMessageSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            summary: convertItemToString(details.summary),
            ourPromise: convertItemToString(details.our_promise),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }

  listContactInfo$(pageNumber?: string) {
    const API = environment.baseURL +
      environment.contactUs.rootURL +
      environment.contactUs.listContactInfo;

    let params = new HttpParams();

    if (isANumber(pageNumber)) {
      params = params.set('p',
        convertItemToString(pageNumber));
    }

    return this._httpClient.get<PaginatedItemHttpResponse<ContactInfoHttpResponse>>(
      API, { params })
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {

          const FORMATTED_RESULTS = details.results?.map(detail => {
            const formattedDetail: ContactInfoFormatHttpResponse = {
              addressTitle: convertItemToString(detail.address_title),
              address: convertItemToString(detail.address),
              email: convertItemToString(detail.email),
              phoneNumber: convertItemToString(detail.phone_number),
            }

            return formattedDetail;
          });

          const FORMATTED_DETAILS: PaginatedItemHttpResponse<ContactInfoFormatHttpResponse> = {
            count: whichValueShouldIUse(details.count, undefined, ExpectedType.NUMBER),
            next: whichValueShouldIUse(details.next, undefined, ExpectedType.NUMBER),
            results: FORMATTED_RESULTS
          }

          return FORMATTED_DETAILS;
        }))
  }

}
