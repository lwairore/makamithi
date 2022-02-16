import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

export type WhatWeDoSectionHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    section_image?: ItemPreviewHttpResponse;
}>
