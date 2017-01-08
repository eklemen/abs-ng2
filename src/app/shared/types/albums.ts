/*
* SingleAlbum is an object with album title and a list of images
* used to cache albums that have been viewed
*/
export class SingleAlbum {
    title: string;
    images: PhotoDetail[];
    constructor(title: string,
                images: PhotoDetail[]) {
        this.title = title;
        this.images = images;
    }
}
export interface PhotoDetail {
    link: string;
    description: any;
    title: string;
}
////

/*
* Photosets is the response from Flickr
*/
export interface Photosets {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset: Photoset[];
}
export interface Photoset {
    id: string;
    primary: string;
    secret: string;
    server: string;
    farm: number;
    photos: string;
    videos: number;
    title: Title;
    description: Description;
    needs_interstitial: number;
    visibility_can_see_set: number;
    count_views: string;
    count_comments: string;
    can_comment: number;
    date_create: string;
    date_update: string;

}
export interface Title {
    _content: string;
}
export interface Description {
    _content: string;
}
////


/*
* AlbumDetail is detail/metadata about an album
*/
export class AlbumDetail {
    id: string;
    description: any;
    title: any;
    photos: string;
    primary: string;
    constructor(id: string,
                description: any,
                title: any,
                photos: string,
                primary: string) {
        this.id = id;
        this.description = description;
        this.title = title;
        this.photos = photos;
        this.primary = primary;

    }
}
////
