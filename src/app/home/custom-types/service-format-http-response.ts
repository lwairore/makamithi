import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ServiceFormatHttpResponse = Readonly<{
    photo: ItemPreviewFormatHttpResponse;
    id: number;
    title: string;
    summary: string;
}>
