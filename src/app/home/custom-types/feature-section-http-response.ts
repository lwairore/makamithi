import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type FeatureSectionHttpResponse = Readonly<{
    summary?: string;
    background_image?: ItemPreviewHttpResponse;
}>
