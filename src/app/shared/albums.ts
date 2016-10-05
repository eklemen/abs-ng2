export class Album {
    id: string;
    title: string;
    description: string;
    img?: any;
    datetime: number;
    cover: string;
    cover_width: number;
    cover_height: number;
    account_url: string;
    account_id: number;
    privacy: string;
    layout: string;
    views: number;
    link: string;
    favorite: boolean;
    nsfw?: any;
    section?: any;
    images_count: number;
    in_gallery: boolean;
    is_ad: boolean;
    order: number;

    constructor(id: string,
                description: string,
                title: string,
                img: any) {
        this.id = id;
        this.description = description;
        this.title = title;
        this.img = img;
    }
}

export class RootObject {
    data: any;
    success: boolean;
    status: number;
}
