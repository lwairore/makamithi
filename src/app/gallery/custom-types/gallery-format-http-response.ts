import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type GalleryFormatHttpResponse = Readonly<{
    id: number;
    title: string;
    galleryPreview: ItemPreviewFormatHttpResponse;
    category: string;
}>
