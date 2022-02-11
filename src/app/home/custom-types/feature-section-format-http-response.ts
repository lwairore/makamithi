import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type FeatureSectionFormatHttpResponse = Readonly<{
    summary: string;
    photo: ItemPreviewFormatHttpResponse;
    backgroundImage: ItemPreviewFormatHttpResponse;
}>
