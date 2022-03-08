import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaSectionFormatHttpResponse, AreaSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToNumeric, convertItemToString, ExpectedType, isANumber, isObjectEmpty, whichValueShouldIUse } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ServiceAreaSectionFormatHttpResponse, ServiceAreaSectionHttpResponse, ServiceDetailFormatHttpResponse, ServiceDetailHttpResponse, ServiceFormatHttpResponse, ServiceHttpResponse, ServiceSidebarHttpResponse, VideoFormatHttpResponse, VideoHttpResponse } from './custom-types';
import { PlanFormatHttpResponse } from './custom-types/service-detail-format-http-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreaService {

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

  retrieveVideo$() {
    const API = environment.baseURL +
      environment.service.rootURL +
      environment.service.retrieveVideo;

    return this._httpClient.get<VideoHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: VideoFormatHttpResponse = {
            title: convertItemToString(details.title),
            caption: convertItemToString(details.caption),
            thumbnail: this._formatShowcaseItemWithPhoto(details.thumbnail),
            video: constructMediaSrc(details?.video),
          }

          return FORMATTED_DETAILS;
        })
      )
  }

  retrieveServiceSidebarSection$() {
    const API = environment.baseURL +
      environment.service.rootURL +
      environment.service.retrieveServiceSidebarSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            summary: convertItemToString(details.summary),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }

  retrieveServiceDetails$(serviceID: string) {
    const API = (environment.baseURL +
      environment.service.rootURL +
      environment.service.retrieveServiceDetails)
      .replace(':serviceID', serviceID);

    return this._httpClient.get<ServiceDetailHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: ServiceDetailFormatHttpResponse = {
            title: convertItemToString(details.title),
            keywords: convertItemToString(details.keywords),
            description: convertItemToString(details.description),
            createdAt: convertItemToString(details.created_at),
            modifiedDate: convertItemToString(details.modified_date),
            serviceDetailPhoto: this._formatShowcaseItemWithPhoto(details.service_detail_photo),
            plans: details?.plans?.map(plan => {
              const FORMATTED_PLAN: PlanFormatHttpResponse = {
                price: whichValueShouldIUse(plan.price, undefined, ExpectedType.NUMBER),
                typeOfPlan: {
                  title: convertItemToString(plan.type_of_plan?.title),
                  image: this._formatShowcaseItemWithPhoto(plan.type_of_plan?.image)
                },
                benefits: plan.benefits.map(benefit => {
                  const FORMATTED_BENEFIT = {
                    title: convertItemToString(benefit.title),
                    description: convertItemToString(benefit.description)
                  };

                  return FORMATTED_BENEFIT;
                })
              }

              return FORMATTED_PLAN;
            })
          }

          return FORMATTED_DETAILS;
        })
      )
  }

  retrieveServiceAboutSection$() {
    const API = environment.baseURL +
      environment.service.rootURL +
      environment.service.retrieveServiceAboutSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            summary: convertItemToString(details.summary),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }

  retrievePriceSection$() {
    const API = environment.baseURL +
      environment.service.rootURL +
      environment.service.retrievePriceSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            summary: convertItemToString(details.summary),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }


  retrieveServiceAreaSection$() {
    const API = environment.baseURL +
      environment.service.rootURL +
      environment.service.retrieveServiceAreaSection;

    return this._httpClient.get<ServiceAreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: ServiceAreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            description: convertItemToString(details.description),
            yearsOfExperienceImage: this._formatShowcaseItemWithPhoto(details.years_of_experience_image),
          }

          return FORMATTED_DETAILS;
        })
      )
  }

  listOurFeatureForSidebarSection$() {
    const api = environment.baseURL +
      environment.service.rootURL +
      environment.service.ourFeatureService;

    return this._httpClient.get<Array<ServiceSidebarHttpResponse>>(api)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = details.map(
            item => {
              const itemID = convertItemToNumeric(item.id);
              if (!isANumber(itemID)) {
                return null;
              }

              const formattedItem: ServiceSidebarHttpResponse = {
                title: convertItemToString(item.title),
                id: itemID
              };

              return formattedItem;
            }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        })
      )
  }

  listOurFeature$() {
    const api = environment.baseURL +
      environment.service.rootURL +
      environment.service.ourFeatureService;

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
                servicePagePhoto: this._formatShowcaseItemWithPhoto(item.service_page_photo),
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
