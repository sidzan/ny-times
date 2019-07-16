export interface IArticles {
    status: string;
    copyright: string;
    response: IResponse;
}

export interface IResponse {
    docs: IDocRestrutrued[];
    meta?: IMeta;
}

export interface IDoc {
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    abstract: string;
    source: Source;
    multimedia: IMultimedia[];
    headline: IHeadline;
    keywords: IKeyword[];
    pub_date: string;
    document_type: DocumentType;
    news_desk: string;
    section_name: string;
    byline: IByline;
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
    print_page?: string;
    subsection_name?: string;
}

export interface IDocRestrutrued extends IDoc {
    hasImage: boolean;
    thumbnail: string;
    image: string;
}

export interface IByline {
    original: null | string;
    person: IPerson[];
    organization: null | string;
}

export interface IPerson {
    firstname: string;
    middlename: null | string;
    lastname: null | string;
    qualifier: null;
    title: null;
    role: string;
    organization: string;
    rank: number;
}

export enum DocumentType {
    Article = "article",
    Multimedia = "multimedia"
}

export interface IHeadline {
    main: string;
    kicker: null | string;
    content_kicker: null;
    print_headline: null | string;
    name: null;
    seo: null;
    sub: null;
}

export interface IKeyword {
    name: Name;
    value: string;
    rank: number;
    major: Major;
}

export enum Major {
    N = "N"
}

export enum Name {
    Glocations = "glocations",
    Organizations = "organizations",
    Persons = "persons",
    Subject = "subject"
}

export interface IMultimedia {
    rank: number;
    subtype: string;
    caption: null;
    credit: null;
    type: Type;
    url: string;
    height: number;
    width: number;
    legacy: ILegacy;
    subType: string;
    crop_name: string;
}

export interface ILegacy {
    widewidth?: number;
    wideheight?: number;
    wide?: string;
    thumbnail?: string;
    thumbnailwidth?: number;
    thumbnailheight?: number;
    xlarge?: string;
    xlargewidth?: number;
    xlargeheight?: number;
}

export enum Type {
    Image = "image"
}

export enum Source {
    TheNewYorkTimes = "The New York Times"
}

export interface IMeta {
    hits: number;
    offset: number;
    time: number;
}
