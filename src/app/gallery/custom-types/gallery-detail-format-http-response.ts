import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type GalleryDetailFormatHttpResponse = Readonly<{
    layoutImage: ItemPreviewFormatHttpResponse;
    category: string;
    title: string;
    keywords: string;
    description: string;
    occuredOn: string;
    createdAt: string;
    modifiedDate: string;
}>
