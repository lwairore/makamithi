import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ApAboutSectionFormatHttpResponse = Readonly<{
    heading: string;
    subheading: string;
    description: string;
    sectionImage: ItemPreviewFormatHttpResponse;
}>
