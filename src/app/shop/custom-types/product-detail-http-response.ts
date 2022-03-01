import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ProductDetailHttpResponse = Readonly<{
    title?: string;
    price: {
        was?: number | null;
        now?: number | null;
    },
    keywords?: string | null;
    product_images?: ReadonlyArray<ItemPreviewHttpResponse>;
    description?: string;
    total_sales: number | null;
    created_at?: string;
    modified_date?: string;
    total_reviews?: number;
}>
