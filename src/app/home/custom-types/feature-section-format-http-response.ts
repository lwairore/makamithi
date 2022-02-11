import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type FeatureSectionFormatHttpResponse = Readonly<{
    description: string;
    photo: ItemPreviewFormatHttpResponse;
}>
