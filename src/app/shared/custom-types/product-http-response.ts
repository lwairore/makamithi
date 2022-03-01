import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ProductHttpResponse = Readonly<{
    title?: string;
    id?: number;
    product_preview?: ItemPreviewHttpResponse;
    price?: number;
    total_sales?: number;
}>
