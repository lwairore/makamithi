import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse, PaginatedItemHttpResponse, ProductFormatHttpResponse, ProductHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToNumeric, convertItemToString, ExpectedType, isANumber, isObjectEmpty, whichValueShouldIUse } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDetailFormatHttpResponse, ProductDetailHttpResponse, ProductReviewFormatHttpResponse, ProductReviewHttpResponse } from './custom-types';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

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

  listProductReview$(productID: string, pageNumber?: string) {
    let api = (environment.baseURL +
      environment.shop.rootURL +
      environment.shop.productReviews())
      .replace(':productID', productID);

    let params = new HttpParams();

    if (isANumber(pageNumber)) {
      params = params.set('p',
        convertItemToString(pageNumber));
    }

    return this._httpClient.get<PaginatedItemHttpResponse<ProductReviewHttpResponse>>(
      api, { params }).pipe(
        retryWithBackoff(1000, 5),
        map(details => {

          const FORMATTED_RESULTS = details?.results?.map(detail => {
            const formattedDetail: ProductReviewFormatHttpResponse = {
              fullName: convertItemToString(detail.full_name),
              clientImage: this._formatShowcaseItemWithPhoto(detail.client_image),
              review: convertItemToString(detail.review),
              createdAt: convertItemToString(detail.created_at),
              rating: whichValueShouldIUse(detail.rating, 0, ExpectedType.NUMBER),
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item)) ?? null;

          const FORMATTED_DETAILS: PaginatedItemHttpResponse<ProductReviewFormatHttpResponse> = {
            next: whichValueShouldIUse(details.next, undefined, ExpectedType.NUMBER),
            results: FORMATTED_RESULTS as Array<ProductReviewFormatHttpResponse>
          }

          return FORMATTED_DETAILS;
        }));
  }

  retrieveProductDetail$(productID: string) {
    const API = (environment.baseURL +
      environment.shop.rootURL +
      environment.shop.productDetail)
      .replace(':productID', productID);

    return this._httpClient.get<ProductDetailHttpResponse>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          console.log({ details });

          const FORMATTED_PRODUCT_IMAGES = details?.product_images?.map(image => {
            const FORMATTED_IMAGE = this._formatShowcaseItemWithPhoto(image);

            return FORMATTED_IMAGE;
          });

          const FORMATTED_DETAILS: ProductDetailFormatHttpResponse = {
            title: convertItemToString(details.title),
            price: {
              was: whichValueShouldIUse(details.price.was, null, ExpectedType.NUMBER),
              now: whichValueShouldIUse(details.price.now, null, ExpectedType.NUMBER),
            },
            productImages: FORMATTED_PRODUCT_IMAGES as ReadonlyArray<ItemPreviewFormatHttpResponse>,
            description: convertItemToString(details.description),
            keywords: convertItemToString(details.keywords),
            totalSales: whichValueShouldIUse(details.total_sales, null, ExpectedType.NUMBER),
            createdAt: convertItemToString(details.created_at),
            modifiedDate: convertItemToString(details.modified_date),
            totalReviews: whichValueShouldIUse(details.total_reviews, 0, ExpectedType.NUMBER),
          };

          return FORMATTED_DETAILS;
        })
      )
  }

  listProductForShopSection$(pageNumber?: string) {

    let api = environment.baseURL +
      environment.shop.rootURL +
      environment.shop.listProductForShopSection;

    let params = new HttpParams();

    if (isANumber(pageNumber)) {
      params = params.set('p',
        convertItemToString(pageNumber));
    }

    return this._httpClient.get<PaginatedItemHttpResponse<ProductHttpResponse>>(
      api, { params })
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {

          const FORMATTED_RESULTS = details?.results?.map(detail => {
            const detailID = convertItemToNumeric(detail.id);
            if (!isANumber(detailID)) {
              return null;
            }

            const formattedDetail: ProductFormatHttpResponse = {
              title: convertItemToString(detail.title),
              productPreview: this._formatShowcaseItemWithPhoto(detail.product_preview),
              id: detailID,
              price: whichValueShouldIUse(detail.price, 0, ExpectedType.NUMBER),
              totalSales: whichValueShouldIUse(detail.total_sales, 0, ExpectedType.NUMBER),
            }

            return formattedDetail;
          }).filter(item => !isObjectEmpty(item)) ?? null;

          const FORMATTED_DETAILS: PaginatedItemHttpResponse<ProductFormatHttpResponse> = {
            count: whichValueShouldIUse(details.count, undefined, ExpectedType.NUMBER),
            next: whichValueShouldIUse(details.next, undefined, ExpectedType.NUMBER),
            results: FORMATTED_RESULTS as Array<ProductFormatHttpResponse>
          }

          return FORMATTED_DETAILS;
        }))
  }
}
