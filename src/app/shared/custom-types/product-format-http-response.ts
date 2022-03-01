import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ProductFormatHttpResponse = Readonly<{
    title: string;
    id: number;
    productPreview: ItemPreviewFormatHttpResponse;
    price: number;
    totalSales: number;
}>
