import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ServiceHttpResponse = Readonly<{
    home_photo?: ItemPreviewHttpResponse;
    id?: number;
    title?: string;
    summary?: string;
}>
