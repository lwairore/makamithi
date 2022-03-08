import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactInfoFormatHttpResponse, ContactInfoHttpResponse, HeaderSectionFormatHttpResponse, HeaderSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse, ServiceNavSidebarFormatHttpResponse, ServiceNavSidebarHttpResponse, SocialMediaFormatHttpResponse, SocialMediaHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToNumeric, convertItemToString, isANumber, isObjectEmpty, stringIsEmpty } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

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

  listService$() {
    const API = environment.baseURL +
      environment.header.rootURL +
      environment.header.sidebar.listService();

    return this._httpClient.get<Array<ServiceNavSidebarHttpResponse>>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const FORMATTED_DETAILS = details.map(detail => {
            const DETAIL_ID = convertItemToNumeric(detail.id);
            if (!isANumber(DETAIL_ID)) {
              return null;
            }

            const FORMATTED_DETAIL: ServiceNavSidebarFormatHttpResponse = {
              title: convertItemToString(detail.title),
              id: DETAIL_ID,
              navSidebarPhoto: this._formatShowcaseItemWithPhoto(detail.nav_sidebar_photo),
            };

            return FORMATTED_DETAIL;

          }).filter(detail => !isObjectEmpty(detail));

          return FORMATTED_DETAILS;
        }))

  }

  retrieveLogosForStickyHeader$() {
    const API = environment.baseURL +
      environment.header.rootURL +
      environment.header.sidebar.retrieveLogosForStickyHeader();


    return this._httpClient.get<HeaderSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          console.log({ details });
          const FORMATTED_DETAILS: HeaderSectionFormatHttpResponse = {
            retinaLogo: this._formatShowcaseItemWithPhoto(details.retina_logo),
            standardLogo: this._formatShowcaseItemWithPhoto(details.standard_logo),
          }

          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        }));
  }


  retrieveTopHeaderDetails$() {
    const API = environment.baseURL +
      environment.header.rootURL +
      environment.header.sidebar.retrieveTopHeaderDetails();

    return this._httpClient.get<HeaderSectionHttpResponse>(API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          console.log({ details });
          const FORMATTED_DETAILS: HeaderSectionFormatHttpResponse = {
            primaryLocation: convertItemToString(details.primary_location),
            whatsappBusinessNumber: convertItemToString(details.whatsapp_business_number),
          }

          console.log({ FORMATTED_DETAILS })

          return FORMATTED_DETAILS;
        }));
  }

  listContactInfo$() {
    const API = environment.baseURL +
      environment.header.rootURL +
      environment.header.sidebar.listContactInfo();

    return this._httpClient.get<Array<ContactInfoHttpResponse>>(
      API)
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {
          const ADDRESSES = new Set<{
            addressTitle: string;
            address: string;
          }>();

          const PHONE_NUMBERS = new Set<string>();

          const EMAILS = new Set<string>();

          for (const ITEM of details) {
            const ADDRESS_TITLE = convertItemToString(ITEM.address_title);
            const ADDRESS = convertItemToString(ITEM.address);

            if (!stringIsEmpty(ADDRESS_TITLE) && !stringIsEmpty(ADDRESS)) {
              ADDRESSES.add(
                {
                  addressTitle: ADDRESS_TITLE,
                  address: ADDRESS,
                });
            }

            const PHONE_NUMBER = convertItemToString(ITEM.phone_number);
            if (!stringIsEmpty(PHONE_NUMBER)) {
              PHONE_NUMBERS.add(PHONE_NUMBER);
            }

            const EMAIL = convertItemToString(ITEM.email);
            if (!stringIsEmpty(EMAIL)) {
              EMAILS.add(EMAIL);
            }
          }

          const FORMATTED_DETAILS: {
            addresses: Array<{
              addressTitle: string;
              address: string;
            }>;
            phoneNumbers: Array<string>;
            emails: Array<string>;
          } = {
            addresses: Array(),
            phoneNumbers: Array(),
            emails: Array()
          };

          if (ADDRESSES.size) {
            FORMATTED_DETAILS.addresses = [...ADDRESSES]
          }

          if (PHONE_NUMBERS.size) {
            FORMATTED_DETAILS.phoneNumbers = [...PHONE_NUMBERS]
          }

          if (EMAILS.size) {
            FORMATTED_DETAILS.emails = [...EMAILS]
          }


          return FORMATTED_DETAILS;
        }))
  }
}
