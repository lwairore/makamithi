import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ProductFormatHttpResponse = Readonly<{
    title: string;
    id: number;
    photo: ItemPreviewFormatHttpResponse;
    price: number;
}>
