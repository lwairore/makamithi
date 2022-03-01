import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ProductReviewFormatHttpResponse = Readonly<{
    fullName: string;
    clientImage: ItemPreviewFormatHttpResponse;
    review: string;
    createdAt: string;
    rating: number;
}>
