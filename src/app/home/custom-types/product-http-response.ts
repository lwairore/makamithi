import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ProductHttpResponse = Readonly<{
    title?: string;
    id?: number;
    photo?: ItemPreviewHttpResponse;
    price?: number;
}>
