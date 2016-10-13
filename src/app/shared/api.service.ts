import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootObject, Album } from './albums';

@Injectable()
export class ApiService {
  private baseUrl: string = 'https://api.imgur.com/3/account/eklemen';
  albumList: any[] = [];
  singleAlbum: any = {};

  getAlbums (): Observable<RootObject> {
      // check if we have already saved the albums, if not make the call to imgur
      if (this.albumList.length) {
          return Observable.of(this.albumList);
      } else {
          return this.http.get(`${this.baseUrl}/albums`, {headers: this.headers()})
              .map(res => res.json().data) // Get the albums array
              .flatMap( albums => {
                  return albums;
              })
              .flatMap(album => {
                  let albumDetails = new Album(album.id, album.description, album.title, null);
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

  getSingleAlbum (albumId: any): Observable<any> {
      if (!this.singleAlbum[albumId]) {
          return this.http.get(`${this.baseUrl}/album/${albumId}`, {headers: this.headers()})
              .map(album => {this.singleAlbum[albumId] = album.json().data; return album.json().data})
              .catch<RootObject>(this.handleError);
      }
      return Observable.of(this.singleAlbum[albumId]);
  }

  private handleError (error: any) {
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
  constructor(private http: Http){ }

}
