import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type VisitNowCtaSectionFormatHttpResponse = Readonly<{
    heading: string;
    description: string;
    sectionImage: ItemPreviewFormatHttpResponse;
    backgroundImage: ItemPreviewFormatHttpResponse;
}>
