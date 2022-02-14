import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type WhyChooseUsSectionFormatHttpResponse = Readonly<{
    heading: string;
    description: string;
    sectionImage: ItemPreviewFormatHttpResponse;
}>
