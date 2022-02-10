import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type AboutSectionHttpResponse = Readonly<{
    heading?: string;
    subheading?: string;
    description?: string;
    photo?: ItemPreviewHttpResponse;
}>
