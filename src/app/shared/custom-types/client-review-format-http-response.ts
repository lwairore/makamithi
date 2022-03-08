import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ClientReviewFormatHttpResponse =Readonly<{
    fullName: string;
    review: string;
    position: string;
    image: ItemPreviewFormatHttpResponse;
}>
