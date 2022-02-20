import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type TeamFormatHttpResponse = Readonly<{
    fullName: string;
    role: string;
    image: ItemPreviewFormatHttpResponse;
    contacts: {
        facebook: string;
        twitter: string;
    };
}>
