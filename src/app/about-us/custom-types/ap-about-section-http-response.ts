import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export interface ApAboutSectionHttpResponse {
    heading?: string;
    subheading?: string;
    description?: string;
    section_image?: ItemPreviewHttpResponse;
}
