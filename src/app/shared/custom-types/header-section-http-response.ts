import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type HeaderSectionHttpResponse = Readonly<{
    primary_location?: string;
    primary_email?: string;
    whatsapp_business_number?: string;
    logo_side?: ItemPreviewHttpResponse;
    standard_logo?: ItemPreviewHttpResponse;
    retina_logo?: ItemPreviewHttpResponse;
}>
