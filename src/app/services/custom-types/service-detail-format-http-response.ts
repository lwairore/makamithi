import { ItemPreviewFormatHttpResponse } from "@sharedModule/custom-types";

export type PlanFormatHttpResponse = Readonly<{
    price?: number;
    typeOfPlan: {
        title: string;
        image?: ItemPreviewFormatHttpResponse;
    },
    benefits: ReadonlyArray<{
        title: string;
        description: string;
    }>
}>

export type ServiceDetailFormatHttpResponse = Readonly<{
    title: string;
    description: string;
    keywords: string;
    serviceDetailPhoto: ItemPreviewFormatHttpResponse;
    plans?: ReadonlyArray<PlanFormatHttpResponse>;
    createdAt: string;
    modifiedDate: string;
}>
