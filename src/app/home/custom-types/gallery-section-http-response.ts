import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type GallerySectionHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    section_image?: ItemPreviewHttpResponse;
    background_image?: ItemPreviewHttpResponse;
}>
