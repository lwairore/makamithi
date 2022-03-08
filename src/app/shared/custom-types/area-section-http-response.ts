import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type AreaSectionHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    description?: string;
    section_image?: ItemPreviewHttpResponse;
    background_image?: ItemPreviewHttpResponse;
    call_to_action?: string;
    our_promise?: string;
}>
