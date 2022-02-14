import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ServiceHttpResponse = Readonly<{
    photo?: ItemPreviewHttpResponse;
    id?: number;
    title?: string;
    summary?: string;
}>
