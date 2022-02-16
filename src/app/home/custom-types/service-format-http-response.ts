import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ServiceFormatHttpResponse = Readonly<{
    homePhoto: ItemPreviewFormatHttpResponse;
    id: number;
    title: string;
    summary: string;
}>
