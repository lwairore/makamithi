import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type GallerySectionHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    section_image?: ItemPreviewHttpResponse;
    background_image?: ItemPreviewHttpResponse;
}>
