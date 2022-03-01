import { ItemPreviewHttpResponse } from "@sharedModule/custom-types"

export type ProductReviewHttpResponse = Readonly<{
    full_name?: string;
    client_image?: ItemPreviewHttpResponse;
    review?: string;
    created_at?: string;
    rating?: number;

}>
