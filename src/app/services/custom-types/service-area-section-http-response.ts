import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ServiceAreaSectionHttpResponse = Readonly<{
    heading?: string;
    description?: string;
    years_of_experience_image?: ItemPreviewHttpResponse;
}>
