import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaSectionFormatHttpResponse, AreaSectionHttpResponse, ItemPreviewFormatHttpResponse, ItemPreviewHttpResponse, PaginatedItemHttpResponse, TeamFormatHttpResponse, TeamHttpResponse } from '@sharedModule/custom-types';
import { retryWithBackoff } from '@sharedModule/operators';
import { constructMediaSrc, convertItemToString, ExpectedType, isANumber, whichValueShouldIUse } from '@sharedModule/utilities';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

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

  listTeam$(pageNumber?: string) {
    const API = environment.baseURL +
      environment.team.rootURL +
      environment.team.listTeam;

    let params = new HttpParams();

    if (isANumber(pageNumber)) {
      params = params.set('p',
        convertItemToString(pageNumber));
    }

    return this._httpClient.get<PaginatedItemHttpResponse<TeamHttpResponse>>(
      API, { params })
      .pipe(
        retryWithBackoff(1000, 5),
        map(details => {

          const FORMATTED_RESULTS = details.results?.map(detail => {
            const formattedDetail: TeamFormatHttpResponse = {
              fullName: convertItemToString(detail.full_name),
              image: this._formatShowcaseItemWithPhoto(detail.image),
              role: convertItemToString(detail.role),
              socialMedia: {
                facebook: convertItemToString(detail.facebook),
                twitter: convertItemToString(detail.twitter),
              },
            }

            return formattedDetail;
          });


          const FORMATTED_DETAILS: PaginatedItemHttpResponse<TeamFormatHttpResponse> = {
            count: whichValueShouldIUse(details.count, undefined, ExpectedType.NUMBER),
            next: whichValueShouldIUse(details.next, undefined, ExpectedType.NUMBER),
            results: FORMATTED_RESULTS
          }

          return FORMATTED_DETAILS;
        }))
  }

  retrieveTeamAreaSection$() {
    const API = environment.baseURL +
      environment.aboutUs.rootURL +
      environment.aboutUs.retrieveTeamAreaSection;

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


}
