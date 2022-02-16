import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToString } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApAboutSectionFormatHttpResponse, ApAboutSectionHttpResponse, FaqHttpResponse, FaqSectionFormatHttpResponse, FaqSectionHttpResponse } from './custom-types';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(
    private _httpClient: HttpClient,
    private _upperCasePipe: UpperCasePipe,
  ) { }

  private _transformToUpperCase(value: string) {
    return this._upperCasePipe.transform(value);
  }

  private _formatShowcaseItemWithPhoto(
    photo?: ItemPreviewHttpResponse) {
    const formattedPhoto: ItemPreviewFormatHttpResponse = {
      alt: convertItemToString(photo?.caption),
      src: constructMediaSrc(photo?.image),
    }

    return formattedPhoto;
  }

  retrieveFaqSection$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.retrieveFaqSection;

    return this._httpClient.get<FaqSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: FaqSectionFormatHttpResponse = {
            title: convertItemToString(details.title),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }

  listFaq$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.listFaq;

    return this._httpClient.get<Array<FaqHttpResponse>>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS = details.map(detail => {
            const FORMATTED_DETAIL: FaqHttpResponse = {
              question: convertItemToString(detail.question),
              answer: convertItemToString(detail.answer),
            };

            return FORMATTED_DETAIL;
          });

          return FORMATTED_DETAILS;
        }));
  }

  retrieveApAboutSection$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.retrieveApAboutSection;

    return this._httpClient.get<ApAboutSectionHttpResponse>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: ApAboutSectionFormatHttpResponse = {
            heading: this._transformToUpperCase(convertItemToString(details.heading)),
            subheading: convertItemToString(details.subheading),
            description: convertItemToString(details.description),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }
}
