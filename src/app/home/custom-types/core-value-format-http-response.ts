import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type CoreValueFormatHttpResponse = Readonly<{
    title: string;
    description: string;
    image: ItemPreviewFormatHttpResponse;
    id: number;
}>
