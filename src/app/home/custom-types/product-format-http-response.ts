import { ItemPreviewFormatHttpResponse } from ".";

export type ProductFormatHttpResponse = Readonly<{
    title: string;
    id: number;
    photo: ItemPreviewFormatHttpResponse;
}>
