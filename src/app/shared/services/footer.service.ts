import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactInfoFormatHttpResponse, ContactInfoHttpResponse, FooterSectionFormatHttpResponse, FooterSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToString } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
@Injectable({

  providedIn: 'root'
})
export class FooterService {

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

  listContactInfo$() {
    const API = environment.baseURL +
      environment.footer.rootURL +
      environment.footer.listContactInfo;

    return this._httpClient.get<Array<ContactInfoHttpResponse>>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS = details.map(detail => {
            const FORMATTED_DETAIL: ContactInfoFormatHttpResponse = {
              address: convertItemToString(detail.address),
              addressTitle: convertItemToString(detail.address_title),
              email: convertItemToString(detail.email),
              phoneNumber: convertItemToString(detail.phone_number),
            };

            return FORMATTED_DETAIL;
          })

          return FORMATTED_DETAILS;
        }))
  }

  retrieveFooterSectionDetails$() {
    const API = environment.baseURL +
      environment.footer.rootURL +
      environment.footer.retrieveFooterSection;


    return this._httpClient.get<FooterSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          console.log({ details });
          const FORMATTED_DETAILS: FooterSectionFormatHttpResponse = {
            footerLogo: this._formatShowcaseItemWithPhoto(details.footer_logo),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
            footerText: convertItemToString(details.footer_text),
          }

          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        }));
  }

}
