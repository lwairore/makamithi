import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type FaqSectionFormatHttpResponse = Readonly<{
    title: string;
    backgroundImage: ItemPreviewFormatHttpResponse;
}>
