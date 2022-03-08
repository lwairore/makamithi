import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type AreaSectionFormatHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    description?: string;
    sectionImage?: ItemPreviewFormatHttpResponse;
    backgroundImage?: ItemPreviewFormatHttpResponse;
    callToAction?: string;
    ourPromise?: string;
}>
