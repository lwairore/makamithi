import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type BannerAdFormatHttpResponse = Readonly<{
    title: string;
    description: string;
    photo: ItemPreviewFormatHttpResponse;
}>
