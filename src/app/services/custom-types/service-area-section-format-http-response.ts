import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type ServiceAreaSectionFormatHttpResponse = Readonly<{
    heading: string;
    description: string;
    yearsOfExperienceImage: ItemPreviewFormatHttpResponse;
}>
