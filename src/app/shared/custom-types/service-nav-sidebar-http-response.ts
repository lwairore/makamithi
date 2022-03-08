import { ItemPreviewHttpResponse } from "./item-preview-http-response";

export type ServiceNavSidebarHttpResponse = Readonly<{
    nav_sidebar_photo?: ItemPreviewHttpResponse;
    title?: string;
    id?: number;
}>
