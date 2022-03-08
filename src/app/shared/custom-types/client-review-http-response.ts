import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ClientReviewHttpResponse = Readonly<{
    full_name?: string;
    review?: string;
    position?: string;
    image?: ItemPreviewHttpResponse
}>
