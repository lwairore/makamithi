import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type FeatureSectionFormatHttpResponse = Readonly<{
    summary: string;
    sectionImage: ItemPreviewFormatHttpResponse;
    backgroundImage: ItemPreviewFormatHttpResponse;
}>
