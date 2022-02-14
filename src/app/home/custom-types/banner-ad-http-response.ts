import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type BannerAdHttpResponse = Readonly<{
    title?: string;
    description?: string;
    photo?: ItemPreviewHttpResponse;
}>
