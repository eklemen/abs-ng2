import {Injectable} from '@angular/core';
import {Http, Headersm Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Photoset, Album, Description, Title} from './types/albums';

@Injectable()
export class ApiService {
    private baseUrl: string = 'https://api.flickr.com/services/rest?format=json';
    private apiKey: string = '&api_key=4f5119269b775b734ed7d65c29881543';
    private userId: string = '&user_id=130620580@N04';
    private fullUrl: string = `${this.baseUrl}${this.apiKey}${this.userId}&nojsoncallback=1`;
    albumList: Album[] = [];
    cachedAlbums: any = {};

    getAlbums(): Observable<any> {
        // check if we have already saved the albums, if not make the call to imgur
        if (this.albumList.length) {
            return Observable.of(this.albumList);
        } else {
            return this.http.get(`${this.fullUrl}&method=flickr.photosets.getList`)
                .map(res => {return res.json().photosets.photoset}) // Get the albums/photosets array
                .flatMap(albums => albums)
                .flatMap((album: Album) => {
                    let description:any = album.description._content;
                    let title:any = album.title._content;
                    let albumDetails = new Album(
                        album.id,
                        description,
                        title,
                        album.photos,
                        album.primary
                    );
                    this.albumList.push(albumDetails);
                    console.log(this.albumList)
                    return this.http.get(`${this.fullUrl}&method=flickr.photos.getInfo&photo_id=${album.primary}&callback=JSONP_CALLBACK`,
                        {headers: this.headers()})
                        .map( image => {
                            debugger;
                            let coverImage = image.json().data.link;
                            albumDetails.primary = coverImage;
                            console.log('albumlist', this.albumList);
                            console.log('albumDetail class', albumDetails);
                            return this.albumList;
                        });
                })
                .catch(this.handleError);
        }

    }

    getAlbumCover(album:any): any {
        return album.map(album => {
            return this.http.get(`${this.fullUrl}&method=flickr.photos_getInfo=${album.primary}`,
                {headers: this.headers()})
                .flatMap( image => {
                    debugger;
                    let coverImage = image.json().data.link;
                    album.primary = coverImage;
                    console.log('albumlist', this.albumList);
                    console.log('albumDetail class', album);
                    return this.albumList;
                });
        })

    }

    /*
     * getSingleAlbum will push to cachedAlbums on first view caching the response
     * Check this object before making get request to imgur
     * Example of cachedAlbums:
     *  cachedAlbums =
     *  {
     *      'lkja': {response},
     *      'qwer': {response}
     *  }

     */
    getSingleAlbum(albumId: any): any {
        if (!this.cachedAlbums[albumId]) {
            return this.http.get(`${this.baseUrl}/album/${albumId}`, {headers: this.headers()})
                .map(album => {
                    this.cachedAlbums[albumId] = album.json().data;
                    return album.json().data;
                })
                .catch(this.handleError);
        }
        return Observable.of(this.cachedAlbums[albumId]);
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private headers() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    constructor(private http: Http, private _jsonp: Jsonp) {
    }

}
