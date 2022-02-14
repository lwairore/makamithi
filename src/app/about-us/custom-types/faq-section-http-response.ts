import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type FaqSectionHttpResponse = Readonly<{
    title?: string;
    background_image?: ItemPreviewHttpResponse;
}>
