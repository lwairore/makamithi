import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type AboutSectionFormatHttpResponse = {
    heading: string;
    subheading: string;
    description: string;
    photo: ItemPreviewFormatHttpResponse;
}
