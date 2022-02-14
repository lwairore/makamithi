import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type VisitNowCtaSectionHttpResponse = Readonly<{
    heading?: string;
    description?: string;
    background_image?: ItemPreviewHttpResponse;
    section_image?: ItemPreviewHttpResponse;
}>
