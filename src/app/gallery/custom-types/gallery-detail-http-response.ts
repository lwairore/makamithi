import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type GalleryDetailHttpResponse = Readonly<{
    layout_image?: ItemPreviewHttpResponse;
    category?: string;
    title?: string;
    keywords?: string;
    description?: string;
    occured_on?: string;
    created_at?: string;
    modified_date?: string;
}>
