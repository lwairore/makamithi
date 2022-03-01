import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type GalleryHttpResponse = Readonly<{
    id?: number;
    title?: string;
    gallery_preview?: ItemPreviewHttpResponse;
    category?: string;
}>
