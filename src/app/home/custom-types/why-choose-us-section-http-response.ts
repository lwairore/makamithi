import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type WhyChooseUsSectionHttpResponse = Readonly<{
    heading?: string;
    description?: string;
    section_image?: ItemPreviewHttpResponse;
}>
