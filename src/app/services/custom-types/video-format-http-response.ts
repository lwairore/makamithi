import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type VideoFormatHttpResponse = Readonly<{
    title: string;
    caption: string;
    thumbnail: ItemPreviewFormatHttpResponse;
    video: string;
}>
