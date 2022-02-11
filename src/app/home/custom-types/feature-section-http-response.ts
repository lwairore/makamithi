import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type FeatureSectionHttpResponse = Readonly<{
    heading?: string;
    description?: string;
    photo?: ItemPreviewHttpResponse;
}>
