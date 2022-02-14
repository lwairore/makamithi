import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type CoreValueHttpResponse = Readonly<{
    title?: string;
    description?: string;
    image?: ItemPreviewHttpResponse;
    id?: number;
}>
