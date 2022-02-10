import { ItemPreviewHttpResponse } from ".";

export type BannerAdHttpResponse = Readonly<{
    title?: string;
    description: string;
    photos?: ReadonlyArray<ItemPreviewHttpResponse>;
}>
