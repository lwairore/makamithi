import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type VisitNowCtaSectionHttpResponse = Readonly<{
    heading?: string;
    description?: string;
    background_image?: ItemPreviewHttpResponse;
}>
