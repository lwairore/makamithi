import { ImageAuxDataHttpResponse } from "./image-aux-data-http-response";

export type SeoDetailsHttpResponse = Readonly<{
    title?: string;
    keywords?: string;
    description?: string;
    image?: ImageAuxDataHttpResponse;
    author?: string;
    section?: string;
}>
