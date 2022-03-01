import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type HomeGalleryFormatHttpResponse = Readonly<{
    homePreview: ItemPreviewFormatHttpResponse;
    id: number;
}>
