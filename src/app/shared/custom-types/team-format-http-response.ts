import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type TeamFormatHttpResponse = Readonly<{
    fullName: string;
    role: string;
    image: ItemPreviewFormatHttpResponse;
    socialMedia: {
        facebook: string;
        twitter: string;
    };
}>
