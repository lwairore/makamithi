import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type AreaSectionHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    section_image?: ItemPreviewHttpResponse;
    background_image?: ItemPreviewHttpResponse;
}>
