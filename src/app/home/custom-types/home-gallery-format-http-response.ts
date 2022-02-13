import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type HomeGalleryFormatHttpResponse = Readonly<{
    image: ItemPreviewFormatHttpResponse;
    id: number;
}>
