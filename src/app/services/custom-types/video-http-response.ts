import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type VideoHttpResponse = Readonly<{
    title?: string;
    caption?: string;
    thumbnail?: ItemPreviewHttpResponse;
    video?: string;
}>
