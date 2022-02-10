import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type BannerAdFormatHttpResponse = Readonly<{
    title: string;
    description: string;
    photos: ReadonlyArray<ItemPreviewFormatHttpResponse>
}>