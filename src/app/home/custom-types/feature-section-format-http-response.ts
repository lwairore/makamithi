import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type FeatureSectionFormatHttpResponse = Readonly<{
    summary: string;
    sectionImage: ItemPreviewFormatHttpResponse;
    backgroundImage: ItemPreviewFormatHttpResponse;
}>
