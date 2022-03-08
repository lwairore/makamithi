import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type HeaderSectionFormatHttpResponse = Readonly<{
    primaryLocation?: string;
    primaryEmail?: string;
    whatsappBusinessNumber?: string;
    logoSide?: ItemPreviewFormatHttpResponse;
    standardLogo?: ItemPreviewFormatHttpResponse;
    retinaLogo?: ItemPreviewFormatHttpResponse;
}>
