import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type CoreValueHttpResponse = Readonly<{
    title?: string;
    description?: string;
    image?: ItemPreviewHttpResponse;
    id?: number;
}>
