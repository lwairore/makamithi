import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type FooterSectionFormatHttpResponse = Readonly<{
    footerText: string;
    footerLogo: ItemPreviewFormatHttpResponse;
    backgroundImage: ItemPreviewFormatHttpResponse;
    sectionImage: ItemPreviewFormatHttpResponse;
}>
