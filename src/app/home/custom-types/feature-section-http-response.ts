import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type FeatureSectionHttpResponse = Readonly<{
    summary?: string;
    background_image?: ItemPreviewHttpResponse;
    section_image?: ItemPreviewHttpResponse;
}>
