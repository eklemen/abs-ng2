import {Injectable} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Photoset, AlbumDetail, Description, Title, SingleAlbum} from './types/albums';

@Injectable()
export class ApiService {
    private baseUrl: string = 'https://api.flickr.com/services/rest?format=json';
    private apiKey: string = '&api_key=4f5119269b775b734ed7d65c29881543';
    private userId: string = '&user_id=130620580@N04';
    private fullUrl: string = `${this.baseUrl}${this.apiKey}${this.userId}&nojsoncallback=1`;
    albumList: AlbumDetail[] = [];
    cachedAlbums: any = {};

    getAlbums(): Observable<any> {
        // check if we have already saved the albums, if not make the call to imgur
        if (this.albumList.length) {
            return Observable.of(this.albumList);
        } else {
            return this.http.get(`${this.fullUrl}&method=flickr.photosets.getList`)
                .map(res => {return res.json().photosets.photoset}) // Get the albums/photosets array
                .flatMap(albums => albums)
                .flatMap((album: AlbumDetail) => {
                    let description:any = album.description._content;
                    let title:any = album.title._content;
                    let albumDetails = new AlbumDetail(
                        album.id,
                        description,
                        title,
                        album.photos,
                        album.primary
                    );
                    this.albumList.push(albumDetails);
                    console.log(this.albumList)
                    return this.http.get(`${this.fullUrl}&method=flickr.photos.getSizes&photo_id=${album.primary}&callback=JSONP_CALLBACK`)
                        .map( sizes => {
                            let listOfSizes = sizes.json().sizes.size;
                            let medium = listOfSizes.find( size => size.label === 'Medium');
                            albumDetails.primary = medium.source;
                            return this.albumList;
                        });
                })
                .catch(this.handleError);
        }

    }

    /*
     * getSingleAlbum will push to cachedAlbums on first view caching the response
     * Check this object before making get request to imgur
     * Example of cachedAlbums:
     *  cachedAlbums =
     *  {
     *      'albumId1': {response},
     *      'albumId2': {response}
     *  }
     */

    getSingleAlbum(albumId: any): Observable<any> {
        if (!this.cachedAlbums[albumId]) {
            return this.http.get(`${this.fullUrl}&method=flickr.photosets.getPhotos&photoset_id=${albumId}&extras=original_format`)
                .map(album => {

                    let data = album.json().photoset;
                    let albumImages = data.photo
                    let albumTitle = data.title
                    let refinedImages = albumImages.map( image => {
                        let source = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.originalsecret}_o.${image.originalformat}`;
                        return {
                            title: image.title,
                            link: source,
                            description: null
                        }
                    })
                    let newAlbum = new SingleAlbum(albumTitle, refinedImages)
                    this.cachedAlbums[albumId] = newAlbum;
                    return this.cachedAlbums[albumId];
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

    // private headers() {
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return headers;
    // }

    constructor(private http: Http, private _jsonp: Jsonp) {
    }

}
