import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type BannerAdHttpResponse = Readonly<{
    title?: string;
    description?: string;
    photos?: ReadonlyArray<ItemPreviewHttpResponse>;
}>
