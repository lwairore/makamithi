import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retryWithBackoff } from '@sharedModule/operators';
import { convertItemToString, isObjectEmpty, stringIsEmpty } from '@sharedModule/utilities';
import { memoize } from 'lodash';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from './custom-types';
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
      environment.home.bannerAd.listBannerAd();

    return this._httpClient.get<Array<BannerAdHttpResponse>>(
      api).pipe(
        retryWithBackoff<Array<BannerAdHttpResponse>>(1000, 5),
        map(ads => {
          const formattedAds = ads.map(ad => {
            const formattedAd: BannerAdFormatHttpResponse = {
              title: convertItemToString(ad.title),
              description: convertItemToString(ad.description),
              photos: this._formatShowcaseItemWithPhoto(ad.photos)
            };

            return formattedAd;
          }).filter(item => !isObjectEmpty(item));;

          return formattedAds;
        })
      );
  }
}
