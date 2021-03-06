import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AreaSectionFormatHttpResponse,
  AreaSectionHttpResponse,
  ItemPreviewFormatHttpResponse,
  ItemPreviewHttpResponse,
  ProductFormatHttpResponse,
  ProductHttpResponse
} from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import {
  constructMediaSrc,
  convertItemToNumeric,
  convertItemToString,
  ExpectedType,
  isANumber,
  isObjectEmpty,
  whichValueShouldIUse,
} from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import {
  AboutSectionFormatHttpResponse,
  AboutSectionHttpResponse,
  BadgeFormatHttpResponse,
  BadgeHttpResponse,
  CoreValueFormatHttpResponse,
  CoreValueHttpResponse,
  HomeGalleryFormatHttpResponse,
  HomeGalleryHttpResponse,
  ProductCategoryFormatHttpResponse,
  ProductCategoryHttpResponse,
  ServiceFormatHttpResponse,
  ServiceHttpResponse,
} from './custom-types';
import { BannerAdFormatHttpResponse } from './custom-types/banner-ad-format-http-response';
import { BannerAdHttpResponse } from './custom-types/banner-ad-http-response';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  private _formatShowcaseItemWithPhoto(
    photo?: ItemPreviewHttpResponse) {
    const formattedPhoto: ItemPreviewFormatHttpResponse = {
      alt: convertItemToString(photo?.caption),
      src: constructMediaSrc(photo?.image),
    }

    return formattedPhoto;
  }

  listBadge$() {
    const api = environment.baseURL +
      environment.home.rootURL +
      environment.home.listBadge;

    return this._httpClient.get<Array<BadgeHttpResponse>>(
      api).pipe(
        retryWithBackoff(1000,
          5),
        map(details => {
          const formattedDetails = details.map(detail => {
            const numberOfYears = convertItemToNumeric(detail.number_of_years);

            if (!isANumber(numberOfYears)) {
              return null;
            }

            const formattedDetail: BadgeFormatHttpResponse = {
              title: convertItemToString(detail.title),
              numberOfYears: convertItemToNumeric(detail.number_of_years),
            };

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        })
      );
  }

  listBannerAds$() {
    const api = environment.baseURL +
      environment.home.rootURL +
      environment.home.bannerAd;

    return this._httpClient.get<Array<BannerAdHttpResponse>>(
      api).pipe(
        retryWithBackoff<Array<BannerAdHttpResponse>>(1000,
          5),
        map(ads => {
          const formattedAds = ads.map(ad => {
            const formattedAd: BannerAdFormatHttpResponse = {
              title: convertItemToString(ad.title),
              description: convertItemToString(ad.description),
              photo: this._formatShowcaseItemWithPhoto(ad.photo)
            };

            return formattedAd;
          }).filter(item => !isObjectEmpty(item));

          return formattedAds;
        })
      );
  }

  listProductForACategory$(productCategoryID: string) {
    const api = (environment.baseURL +
      environment.shop.rootURL +
      environment.shop.listProductForACategory)
      .replace(':productCategoryID',
        productCategoryID);

    return this._httpClient.get<Array<ProductHttpResponse>>(api)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = details.map(detail => {
            const detailID = convertItemToNumeric(detail.id);
            if (!isANumber(detailID)) {
              return null;
            }

            const formattedDetail: ProductFormatHttpResponse = {
              totalSales: whichValueShouldIUse(detail.total_sales, 0, ExpectedType.NUMBER),
              title: convertItemToString(detail.title),
              productPreview: this._formatShowcaseItemWithPhoto(detail.product_preview),
              id: detailID,
              price: whichValueShouldIUse(detail.price, 0, ExpectedType.NUMBER),
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        }))
  }

  retrieveProductAreaSection$() {
    const API = environment.baseURL +
      environment.home.rootURL +
      environment.home.productAreaSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            summary: convertItemToString(details.summary),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          return FORMATTED_DETAILS
        }));
  }

  listProductCategory$() {
    const api = environment.baseURL +
      environment.shop.rootURL +
      environment.shop.listProductCategory;

    return this._httpClient.get<Array<ProductCategoryHttpResponse>>(api)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = details.map(detail => {
            const detailID = convertItemToNumeric(detail.id);
            if (!isANumber(detailID)) {
              return null;
            }

            const formattedDetail: ProductCategoryFormatHttpResponse = {
              title: convertItemToString(detail.title),
              description: convertItemToString(detail.description),
              flaticon: convertItemToString(detail.flaticon),
              id: detailID
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        }))
  }

  retrieveVisitNowCtaSection$() {
    const API = environment.baseURL +
      environment.home.rootURL +
      environment.home.visitNowCtaSection;

    return this._httpClient.get<AreaSectionHttpResponse>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            description: convertItemToString(details.description),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          return FORMATTED_DETAILS;
        }))
  }

  listCoreValue$() {
    const API = environment.baseURL +
      environment.home.rootURL +
      environment.home.listCoreValue;

    return this._httpClient.get<Array<CoreValueHttpResponse>>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = details.map(detail => {
            const DETAIL_ID = convertItemToNumeric(detail.id);
            if (!isANumber(detail.id)) {
              return null;
            }

            const formattedDetail: CoreValueFormatHttpResponse = {
              title: convertItemToString(detail.title),
              description: convertItemToString(detail.description),
              id: DETAIL_ID,
              image: this._formatShowcaseItemWithPhoto(detail.image),
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        })
      )
  }

  retrieveCounterAreaSection$() {
    const API = environment.baseURL +
      environment.home.rootURL +
      environment.home.counterAreaSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(
              details.heading),
            backgroundImage: this._formatShowcaseItemWithPhoto(
              details.background_image),
          }

          return FORMATTED_DETAILS;
        }));
  }

  retrieveGallerySection$() {
    const API = environment.baseURL +
      environment.home.rootURL +
      environment.home.gallerySection;

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

          return FORMATTED_DETAILS;
        }));
  }

  listHomeGallerySection$() {
    const API = environment.baseURL
      + environment.gallery.rootURL
      + environment.gallery.listGalleryForHomeSection;

    return this._httpClient.get<Array<HomeGalleryHttpResponse>>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS = details.map(detail => {
            const DETAIL_ID = convertItemToNumeric(detail.id);
            if (!isANumber(DETAIL_ID)) {
              return null;
            }

            const FORMATTED_DETAIL: HomeGalleryFormatHttpResponse = {
              homePreview: this._formatShowcaseItemWithPhoto(detail.home_preview),
              id: DETAIL_ID
            };

            return FORMATTED_DETAIL;
          }).filter(item => !isObjectEmpty(item));

          return FORMATTED_DETAILS;
        }));
  }

  retrieveWhyChooseUsSection$() {
    const API = environment.baseURL +
      environment.home.rootURL +
      environment.home.whyChooseUsSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            heading: convertItemToString(details.heading),
            description: convertItemToString(details.description),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
          }

          return FORMATTED_DETAILS
        }));
  }

  listOurFeature$() {
    const api = environment.baseURL +
      environment.service.rootURL +
      environment.service.ourFeatureHome;

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
                homePhoto: this._formatShowcaseItemWithPhoto(item.home_photo),
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

    return this._httpClient.get<AreaSectionHttpResponse>(
      api).pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails: AreaSectionFormatHttpResponse = {
            summary: convertItemToString(details.summary),
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
            sectionImage: this._formatShowcaseItemWithPhoto(details.section_image),
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
