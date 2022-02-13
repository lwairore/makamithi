import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type CoreValueFormatHttpResponse = Readonly<{
    title: string;
    description: string;
    image: ItemPreviewFormatHttpResponse;
    id: number;
}>
