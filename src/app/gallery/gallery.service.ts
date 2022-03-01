import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaSectionFormatHttpResponse, AreaSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse, PaginatedItemHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToNumeric, convertItemToString, ExpectedType, isANumber, isObjectEmpty, whichValueShouldIUse } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GalleryDetailFormatHttpResponse, GalleryDetailHttpResponse, GalleryFormatHttpResponse, GalleryHttpResponse } from './custom-types';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

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

  listGalleryForGallerySection$(pageNumber?: string) {

    let api = environment.baseURL +
      environment.gallery.rootURL +
      environment.gallery.listGalleryForGallerySection;

    let params = new HttpParams();

    if (isANumber(pageNumber)) {
      params = params.set('p',
        convertItemToString(pageNumber));
    }

    return this._httpClient.get<PaginatedItemHttpResponse<GalleryHttpResponse>>(
      api, { params })
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {

          const FORMATTED_RESULTS = details?.results?.map(detail => {
            const detailID = convertItemToNumeric(detail.id);
            if (!isANumber(detailID)) {
              return null;
            }

            const formattedDetail: GalleryFormatHttpResponse = {
              category: convertItemToString(detail.category),
              galleryPreview: this._formatShowcaseItemWithPhoto(detail.gallery_preview),
              title: convertItemToString(detail.title),
              id: detailID,
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item)) ?? null;

          const FORMATTED_DETAILS: PaginatedItemHttpResponse<GalleryFormatHttpResponse> = {
            count: whichValueShouldIUse(details.count, undefined, ExpectedType.NUMBER),
            next: whichValueShouldIUse(details.next, undefined, ExpectedType.NUMBER),
            results: FORMATTED_RESULTS as Array<GalleryFormatHttpResponse>
          }

          return FORMATTED_DETAILS;
        }))
  }

  retrieveGalleryDetailSection$() {
    const API = environment.baseURL +
      environment.gallery.rootURL +
      environment.gallery.retrieveGalleryDetailSection;

    return this._httpClient.get<AreaSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS: AreaSectionFormatHttpResponse = {
            backgroundImage: this._formatShowcaseItemWithPhoto(details.background_image),
          }

          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        })
      )
  }


  retrieveGalleryDetail$(galleryID: string) {
    const API = (environment.baseURL +
      environment.gallery.rootURL +
      environment.gallery.galleryDetail)
      .replace(':galleryID', galleryID);

    return this._httpClient.get<GalleryDetailHttpResponse>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          console.log({ details });

          const FORMATTED_DETAILS: GalleryDetailFormatHttpResponse = {
            title: convertItemToString(details.title),
            layoutImage: this._formatShowcaseItemWithPhoto(details.layout_image),
            description: convertItemToString(details.description),
            category: convertItemToString(details.category),
            occuredOn: convertItemToString(details.occured_on),
            createdAt: convertItemToString(details.created_at),
            modifiedDate: convertItemToString(details.modified_date),
            keywords: convertItemToString(details.keywords),
          };

          return FORMATTED_DETAILS;
        })
      )
  }
}
