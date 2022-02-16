import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToNumeric, convertItemToString, isANumber, isObjectEmpty, stringIsEmpty } from '@sharedModule/utilities';
import { ExpectedType, whichValueShouldIUse } from '@sharedModule/utilities/which-value-should-i-use.util';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AboutSectionFormatHttpResponse, AboutSectionHttpResponse, CoreValueFormatHttpResponse, CoreValueHttpResponse, FeatureSectionFormatHttpResponse, FeatureSectionHttpResponse, GallerySectionFormatHttpResponse, GallerySectionHttpResponse, HomeGalleryFormatHttpResponse, HomeGalleryHttpResponse, ProductCategoryFormatHttpResponse, ProductCategoryHttpResponse, ProductFormatHttpResponse, ProductHttpResponse, ServiceFormatHttpResponse, ServiceHttpResponse, VisitNowCtaSectionFormatHttpResponse, VisitNowCtaSectionHttpResponse, WhyChooseUsSectionFormatHttpResponse, WhyChooseUsSectionHttpResponse } from './custom-types';
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
          }).filter(item => !isObjectEmpty(item));

          return formattedAds;
        })
      );
  }

  listProduct$(productCategoryID: string) {
    const api = (environment.baseURL +
      environment.shop.rootURL +
      environment.shop.listProduct)
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
              title: convertItemToString(detail.title),
              photo: this._formatShowcaseItemWithPhoto(detail.photo),
              id: detailID,
              price: whichValueShouldIUse(detail.price, 0, ExpectedType.NUMBER),
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item));

          return formattedDetails;
        }))
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

    return this._httpClient.get<VisitNowCtaSectionHttpResponse>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: VisitNowCtaSectionFormatHttpResponse = {
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

  retrieveGallerySection$() {
    const API = environment.baseURL +
      environment.home.rootURL +
      environment.home.gallerySection;

    return this._httpClient.get<GallerySectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: GallerySectionFormatHttpResponse = {
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
      + environment.gallery.listHomeGallery;

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
              image: this._formatShowcaseItemWithPhoto(detail.image),
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

    return this._httpClient.get<WhyChooseUsSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: WhyChooseUsSectionFormatHttpResponse = {
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

    return this._httpClient.get<FeatureSectionHttpResponse>(
      api).pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails: FeatureSectionFormatHttpResponse = {
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
