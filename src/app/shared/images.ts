export interface Image {
	id: string;
	title: string;
	description: string;
	datetime: number;
	type: string;
	animated: boolean;
	width: number;
	height: number;
	size: number;
	views: number;
	bandwidth: number;
	vote?: any;
	favorite: boolean;
	nsfw?: any;
	section?: any;
	account_url?: any;
	account_id?: any;
	is_ad: boolean;
	in_gallery: boolean;
	link: string;
}