import { ItemPreviewFormatHttpResponse } from "./item-preview-format-http-response";

export type ServiceNavSidebarFormatHttpResponse = Readonly<{
    navSidebarPhoto: ItemPreviewFormatHttpResponse;
    title: string;
    id: number;
}>
