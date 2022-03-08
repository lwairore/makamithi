import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type PartnerFormatHttpResponse =Readonly<{
    title: string;
    link: string;
    image: ItemPreviewFormatHttpResponse;
}>
