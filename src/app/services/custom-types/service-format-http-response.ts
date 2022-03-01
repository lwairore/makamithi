import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ServiceFormatHttpResponse = Readonly<{
    servicePagePhoto: ItemPreviewFormatHttpResponse;
    id: number;
    title: string;
    summary: string;
}>
