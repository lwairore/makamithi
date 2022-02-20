import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type TeamHttpResponse = Readonly<{
    full_name?: string;
    role?: string;
    image?: ItemPreviewHttpResponse;
    facebook?: string;
    twitter?: string;
}>
