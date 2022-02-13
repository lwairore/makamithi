import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type GallerySectionFormatHttpResponse = Readonly<{
    heading: string;
    summary: string;
    sectionImage: ItemPreviewFormatHttpResponse;
    backgroundImage: ItemPreviewFormatHttpResponse;
}>
