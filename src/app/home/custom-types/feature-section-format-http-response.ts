import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type FeatureSectionFormatHttpResponse = Readonly<{
    heading: string;
    description: string;
    photo: ItemPreviewFormatHttpResponse;
}>
