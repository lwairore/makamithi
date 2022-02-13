import { ItemPreviewFormatHttpResponse } from ".";

export type GallerySectionFormatHttpResponse = Readonly<{
    heading: string;
    summary: string;
    sectionImage: ItemPreviewFormatHttpResponse;
}>
