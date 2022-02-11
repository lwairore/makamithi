import { ItemPreviewFormatHttpResponse } from ".";

export type ServiceFormatHttpResponse = Readonly<{
    photo: ItemPreviewFormatHttpResponse;
    id: number;
    title: string;
}>
