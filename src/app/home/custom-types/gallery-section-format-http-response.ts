import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type GallerySectionFormatHttpResponse = Readonly<{
    heading: string;
    summary: string;
    sectionImage: ItemPreviewFormatHttpResponse;
    backgroundImage: ItemPreviewFormatHttpResponse;
}>
