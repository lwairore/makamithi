import { ItemPreviewHttpResponse } from "./";

export type GallerySectionHttpResponse = Readonly<{
    heading?: string;
    summary?: string;
    section_image?: ItemPreviewHttpResponse;
}>
