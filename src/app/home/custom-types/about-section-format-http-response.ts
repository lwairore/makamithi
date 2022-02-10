import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type AboutSectionFormatHttpResponse = {
    heading: string;
    subheading: string;
    description: string;
    photo: ItemPreviewFormatHttpResponse;
}
