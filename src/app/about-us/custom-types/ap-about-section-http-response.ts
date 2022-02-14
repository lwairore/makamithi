import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type ApAboutSectionHttpResponse = Readonly<{
    heading?: string;
    subheading?: string;
    description?: string;
    section_image?: ItemPreviewHttpResponse;
}>
