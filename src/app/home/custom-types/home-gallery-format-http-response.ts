import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type HomeGalleryFormatHttpResponse = Readonly<{
    image: ItemPreviewFormatHttpResponse;
    id: number;
}>
