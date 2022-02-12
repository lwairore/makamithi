import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type ProductFormatHttpResponse = Readonly<{
    title: string;
    id: number;
    photo: ItemPreviewFormatHttpResponse;
    price: number;
}>
