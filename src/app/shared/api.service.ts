import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootObject, Album } from './albums';
// import { ROOT } from '../mock-imgur';

@Injectable()
export class ApiService {
  // title = 'Angular 2';
  private cid : string = 'f83e63dbf0b9425';
  private baseUrl: string = 'https://api.imgur.com/3/account/eklemen';
  private body : any;
  private albums : any[] = [];
  public albumList : any[] = [];
  public album : any = {};


  getAlbums (): Observable<RootObject> {
    return this.http.get(`${this.baseUrl}/albums`, {headers: this.headers()})
        .map(res => res.json().data) // Get the albums array
        .flatMap( albums => {
          return this.albums = albums;
        })
        .flatMap((album, index )=> {
          let albumDetails = new Album(index, album.description, album.title, []);
          this.albumList.push(albumDetails);
          // this.album[index].description = album.description;
          return this.http.get(`${this.baseUrl}/album/${album.id}/images`, {headers: this.headers()})
              .flatMap((images, index) => {
                // let imagesToAdd = images.json().data
                return images.json().data.map(image => {
                  console.log('this.albums', this.albums);
                  return image;
                  debugger;
                })
              });
        })
        .catch<RootObject>(this.handleError)
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    this.body = res.json();
    console.log('res.data', this.body.data)
    return this.body.data || {};
  }

  private headers(){
    let headers = new Headers();
    headers.append('Authorization', 'Client-ID f83e63dbf0b9425');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  constructor(private http: Http){ }

}
