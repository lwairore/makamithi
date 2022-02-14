import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type AboutSectionHttpResponse = Readonly<{
    heading?: string;
    subheading?: string;
    description?: string;
    photo?: ItemPreviewHttpResponse;
}>
