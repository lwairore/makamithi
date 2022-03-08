import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type PartnerHttpResponse = Readonly<{
    title?: string;
    link?: string;
    image?: ItemPreviewHttpResponse;
}>
