import { ItemPreviewHttpResponse } from "./item-preview-http-response"

export type FooterSectionHttpResponse = Readonly<{
    footer_text?: string;
    footer_logo?: ItemPreviewHttpResponse;
    background_image?: ItemPreviewHttpResponse;
    section_image?: ItemPreviewHttpResponse;
}>
