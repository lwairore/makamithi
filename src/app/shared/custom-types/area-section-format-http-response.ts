import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type AreaSectionFormatHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    sectionImage?: ItemPreviewFormatHttpResponse;
    backgroundImage?: ItemPreviewFormatHttpResponse;
}>
