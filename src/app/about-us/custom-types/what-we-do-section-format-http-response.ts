import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type WhatWeDoSectionFormatHttpResponse = Readonly<{
    heading: string;
    summary: string;
    sectionImage: ItemPreviewFormatHttpResponse;
}>
