import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retryWithBackoff } from '@sharedModule/operators';
import { convertItemToNumeric, convertItemToString, isANumber, isObjectEmpty, stringIsEmpty } from '@sharedModule/utilities';
import { memoize } from 'lodash';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AboutSectionFormatHttpResponse, AboutSectionHttpResponse, FeatureSectionFormatHttpResponse, FeatureSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse, ServiceFormatHttpResponse, ServiceHttpResponse } from './custom-types';
import { BannerAdFormatHttpResponse } from './custom-types/banner-ad-format-http-response';
import { BannerAdHttpResponse } from './custom-types/banner-ad-http-response';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  constructMediaSrc = memoize((src: any) => {
    if (stringIsEmpty(src)) { return ''; }

    const convertSrcToString = convertItemToString(src);

    const newSrc = (environment.production)
      ? convertSrcToString : `${environment.imageBaseURL}${convertSrcToString}`;

    return newSrc;
  })

  private _formatShowcaseItemWithPhoto(
    photo?: ItemPreviewHttpResponse) {
    const formattedPhoto: ItemPreviewFormatHttpResponse = {
      alt: convertItemToString(photo?.caption),
      src: this.constructMediaSrc(photo?.image),
    }

    return formattedPhoto;
  }

  listBannerAds$() {
    const api = environment.baseURL +
      environment.home.rootURL +
      environment.home.bannerAd;

    return this._httpClient.get<Array<BannerAdHttpResponse>>(
      api).pipe(
        retryWithBackoff<Array<BannerAdHttpResponse>>(1000, 5),
        map(ads => {
          const formattedAds = ads.map(ad => {
            const formattedAd: BannerAdFormatHttpResponse = {
              title: convertItemToString(ad.title),
              description: convertItemToString(ad.description),
              photo: this._formatShowcaseItemWithPhoto(ad.photo)
            };

            return formattedAd;
          }).filter(item => !isObjectEmpty(item));;

          return formattedAds;
        })
      );
  }

  listOurFeature$() {
    const api = environment.baseURL +
      environment.service.rootURL +
      environment.service.ourFeature;

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
                photo: this._formatShowcaseItemWithPhoto(item.photo),
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

  retrieveFeatureSection$() {
    const api = environment.baseURL +
      environment.home.rootURL +
      environment.home.featureSection;

    return this._httpClient.get<FeatureSectionHttpResponse>(
      api).pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails: FeatureSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            description: convertItemToString(details.description),
            photo: this._formatShowcaseItemWithPhoto(details.photo)
          }

          return formattedDetails;
        }));
  }

  retrieveAboutSection$() {
    const api = environment.baseURL +
      environment.home.rootURL +
      environment.home.aboutSection;

    return this._httpClient.get<AboutSectionHttpResponse>(
      api)
      .pipe(
        retryWithBackoff<AboutSectionHttpResponse>(1000, 5),
        map(details => {
          const formattedDetails: AboutSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            subheading: convertItemToString(details.subheading),
            description: convertItemToString(details.description),
            photo: this._formatShowcaseItemWithPhoto(details.photo)
          }

          return formattedDetails;
        }));
  }
}
