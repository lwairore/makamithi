import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type HomeGalleryHttpResponse = Readonly<{
    image?: ItemPreviewHttpResponse;
    id?: number;
}>
