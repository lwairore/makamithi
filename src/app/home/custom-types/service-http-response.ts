import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type ServiceHttpResponse = Readonly<{
    photo?: ItemPreviewHttpResponse;
    id?: number;
}>
