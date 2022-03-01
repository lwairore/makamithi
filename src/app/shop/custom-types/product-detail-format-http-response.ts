import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ProductDetailFormatHttpResponse = Readonly<{
    title: string;
    price: {
        was: number | null;
        now: number | null;
    },
    description: string;
    keywords: string ;
    totalSales: number | null;
    createdAt: string;
    modifiedDate: string;
    productImages: ReadonlyArray<ItemPreviewFormatHttpResponse>;
    totalReviews: number;
}>
