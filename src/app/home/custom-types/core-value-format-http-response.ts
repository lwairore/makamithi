import { ItemPreviewFormatHttpResponse } from ".";

export type CoreValueFormatHttpResponse = Readonly<{
    title: string;
    description: string;
    image: ItemPreviewFormatHttpResponse;
    id: number;
}>
