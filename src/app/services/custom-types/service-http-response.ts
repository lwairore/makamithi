import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ServiceHttpResponse = Readonly<{
    service_page_photo?: ItemPreviewHttpResponse;
    id?: number;
    title?: string;
    summary?: string;
}>
