import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AreaSectionFormatHttpResponse,
  AreaSectionHttpResponse,
  ItemPreviewFormatHttpResponse,
  ItemPreviewHttpResponse
} from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import {
  constructMediaSrc,
  convertItemToNumeric,
  convertItemToString,
  isANumber,
  isObjectEmpty
} from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import {
  ApAboutSectionFormatHttpResponse,
  ApAboutSectionHttpResponse,
  FaqHttpResponse,
  ServiceFormatHttpResponse,
  ServiceHttpResponse
} from './custom-types';

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

  retrieveWhatWeDoSection$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.retrieveWhatWeDoSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            summary: convertItemToString(details.summary),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        })
      )
  }

  retrieveFaqSection$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.retrieveFaqSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
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

  listOurFeature$() {
    const api = environment.baseURL +
      environment.service.rootURL +
      environment.service.ourFeatureAbout;

    return this._httpClient.get<Array<ServiceHttpResponse>>(api)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = details.map(
            item => {
              const itemID = convertItemToNumeric(item.id);
              if (!isANumber(itemID)) {
                return null;
              }

              const formattedItem: ServiceFormatHttpResponse = {
                aboutPhoto: this._formatShowcaseItemWithPhoto(item.about_photo),
                title: convertItemToString(item.title),
                summary: convertItemToString(item.summary),
                id: itemID
              };

              return formattedItem;
            }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        })
      )
  }
}
