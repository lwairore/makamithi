import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type TeamHttpResponse = Readonly<{
    full_name?: string;
    role?: string;
    image?: ItemPreviewHttpResponse;
    facebook?: string;
    twitter?: string;
}>
