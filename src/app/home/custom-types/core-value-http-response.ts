import { ItemPreviewHttpResponse } from ".";

export type CoreValueHttpResponse = Readonly<{
    title?: string;
    description?: string;
    image?: ItemPreviewHttpResponse;
}>
