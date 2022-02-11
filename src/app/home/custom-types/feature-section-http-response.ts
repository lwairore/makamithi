import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type FeatureSectionHttpResponse = Readonly<{
    summary?: string;
    photo?: ItemPreviewHttpResponse;
}>
