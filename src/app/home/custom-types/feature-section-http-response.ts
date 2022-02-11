import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type FeatureSectionHttpResponse = Readonly<{
    description?: string;
    photo?: ItemPreviewHttpResponse;
}>
