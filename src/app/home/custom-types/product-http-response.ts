import { ItemPreviewHttpResponse } from ".";

export type ProductHttpResponse = Readonly<{
    title?: string;
    id?: number;
    photo?: ItemPreviewHttpResponse;
}>
