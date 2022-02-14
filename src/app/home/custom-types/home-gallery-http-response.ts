import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type HomeGalleryHttpResponse = Readonly<{
    image?: ItemPreviewHttpResponse;
    id?: number;
}>
