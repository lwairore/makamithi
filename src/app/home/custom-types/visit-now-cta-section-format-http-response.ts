import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type VisitNowCtaSectionFormatHttpResponse = Readonly<{
    heading: string;
    description: string;
    sectionImage: ItemPreviewFormatHttpResponse;
}>
