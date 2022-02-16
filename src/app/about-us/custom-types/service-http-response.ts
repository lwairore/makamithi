import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ServiceHttpResponse = Readonly<{
    about_photo?: ItemPreviewHttpResponse;
    id?: number;
    title?: string;
}>
