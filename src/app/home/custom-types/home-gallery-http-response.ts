import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type HomeGalleryHttpResponse = Readonly<{
    home_preview?: ItemPreviewHttpResponse;
    id?: number;
}>
