import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {RootObject, Album} from './types/albums';

@Injectable()
export class ApiService {
    private baseUrl: string = 'https://api.imgur.com/3/account/eklemen';
    albumList: Album[] = [];
    cachedAlbums: any = {};

    getAlbums(): Observable<any> {
        // check if we have already saved the albums, if not make the call to imgur
        if (this.albumList.length) {
            return Observable.of(this.albumList);
        } else {
            return this.http.get(`${this.baseUrl}/albums`, {headers: this.headers()})
                .map(res => res.json().data) // Get the albums array
                .flatMap(albums => {
                    return albums;
                })
                .flatMap((album: Album) => {
                    let albumDetails = new Album(album.id, album.description, album.title, null, album.images_count);
                    this.albumList.push(albumDetails);
                    return this.http.get(`${this.baseUrl}/image/${album.cover}`, {headers: this.headers()})
                        .map((image) => {
                            let coverImage = image.json().data.link;
                            albumDetails.cover = coverImage;
                            return this.albumList;
                        });
                })
                .catch<RootObject>(this.handleError);
        }

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
    getSingleAlbum(albumId: any): Observable<any> {
        if (!this.cachedAlbums[albumId]) {
            return this.http.get(`${this.baseUrl}/album/${albumId}`, {headers: this.headers()})
                .map(album => {
                    this.cachedAlbums[albumId] = album.json().data;
                    return album.json().data;
                })
                .catch<RootObject>(this.handleError);
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
        headers.append('Authorization', 'Client-ID f83e63dbf0b9425');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    constructor(private http: Http) {
    }

}
