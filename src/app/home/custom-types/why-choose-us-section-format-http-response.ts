import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type WhyChooseUsSectionFormatHttpResponse = Readonly<{
    heading: string;
    description: string;
    sectionImage: ItemPreviewFormatHttpResponse;
}>
