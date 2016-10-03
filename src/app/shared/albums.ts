export interface Album {
	id: string;
	title: string;
	description: string;
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
                title: string) {
      this.id = id;
      this.description = description;
      this.title = title;
    }
}

export interface RootObject {
	data: any;
	success: boolean;
	status: number;
}