import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type WhyChooseUsSectionHttpResponse = Readonly<{
    heading?: string;
    description?: string;
    section_image?: ItemPreviewHttpResponse;
}>
