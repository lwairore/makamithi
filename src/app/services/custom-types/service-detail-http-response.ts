import { ItemPreviewHttpResponse } from "@sharedModule/custom-types";

type Plan = Readonly<{
    price?: string;
    type_of_plan?: {
        title?: string;
        image: ItemPreviewHttpResponse;
    },
    benefits: ReadonlyArray<{
        title?: string;
        description?: string;
    }>
}>


export type ServiceDetailHttpResponse = Readonly<{
    title?: string;
    keywords?: string;
    description?: string;
    service_detail_photo?: ItemPreviewHttpResponse;
    plans?: ReadonlyArray<Plan>;
    created_at?: string;
    modified_date?: string;
}>
