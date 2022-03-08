import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { SeoDetailsHttpResponse } from '../custom-types';
import { retryWithBackoff } from '../operators';
import { constructMediaSrc, convertItemToString } from '../utilities';
import { ExpectedType, whichValueShouldIUse } from '../utilities/which-value-should-i-use.util';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private _httpClient: HttpClient) { }

  formatSEODetails(seoDetails: SeoDetailsHttpResponse) {
    const formattedDetails = {
      title: convertItemToString(seoDetails.title),
      keywords: convertItemToString(seoDetails.keywords),
      description: convertItemToString(seoDetails.description),
      image: {
        width: whichValueShouldIUse(seoDetails.image?.width, null, ExpectedType.NUMBER),
        height: whichValueShouldIUse(seoDetails.image?.height, null, ExpectedType.NUMBER),
        src: constructMediaSrc(seoDetails.image?.image),
        alt: convertItemToString(seoDetails.image?.caption),
      },
      type: convertItemToString(seoDetails.type),
      author: convertItemToString(seoDetails.author),
      section: convertItemToString(seoDetails.section),
      published: convertItemToString(seoDetails.published),
      modified: convertItemToString(seoDetails.modified),
    }

    return formattedDetails;
  }

  retrieveShopSEODetails$() {
    const API = environment.baseURL
      + environment.shop.rootURL
      + environment.shop.shopSeo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = this.formatSEODetails(details)

          return formattedDetails;
        })
      )
  }

  retrieveGallerySEODetails$() {
    const API = environment.baseURL
      + environment.gallery.rootURL
      + environment.gallery.gallerySeo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = this.formatSEODetails(details)

          return formattedDetails;
        })
      )
  }

  retrieveServiceSEODetails$() {
    const API = environment.baseURL
      + environment.service.rootURL
      + environment.service.serviceSeo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = this.formatSEODetails(details)

          return formattedDetails;
        })
      )
  }

  retrieveAboutUsSEODetails$() {
    const API = environment.baseURL
      + environment.aboutUs.rootURL
      + environment.aboutUs.seo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = this.formatSEODetails(details)

          return formattedDetails;
        })
      )
  }

  retrieveHomeSEODetails$() {
    const API = environment.baseURL
      + environment.home.rootURL
      + environment.home.seo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = this.formatSEODetails(details)

          return formattedDetails;
        })
      )
  }

  retrieveTeamSEODetails$() {
    const API = environment.baseURL
      + environment.team.rootURL
      + environment.team.seo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = this.formatSEODetails(details)

          return formattedDetails;
        })
      )
  }

  retrieveContactUsSEODetails$() {
    const API = environment.baseURL
      + environment.contactUs.rootURL
      + environment.contactUs.seo;

    return this._httpClient.get<SeoDetailsHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const formattedDetails = this.formatSEODetails(details)

          return formattedDetails;
        })
      )
  }
}
