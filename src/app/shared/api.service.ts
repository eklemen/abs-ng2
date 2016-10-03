import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Albums, RootObject } from './albums';
import { ROOT } from '../mock-imgur';

@Injectable()
export class ApiService {
  // title = 'Angular 2';
  private cid : string = 'f83e63dbf0b9425';
  private baseUrl: string = 'https://api.imgur.com/3/account/eklemen';

  getAlbums (): Observable<RootObject> {
    return this.http.get(`${this.baseUrl}/albums`, {headers: this.getHeaders()})
                    .map<RootObject>(this.extractData)
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
    let body = res.json();
    console.log('res.data', body)
    return body.data || {};
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', 'Client-ID f83e63dbf0b9425');
    // headers.append('Content-Type', 'application/json');
    return headers;
  }
  constructor(private http: Http){ }

  // getListings() {
  //   return this.jsonp.request(`${this.publicUrl}/shops/SherrysBeachArt/listings/active.js?callback=JSONP_CALLBACK&${this.key}&includes=MainImage`, {method: 'Get'})
  //     .map(res => res.json());
  // }

  // getSingleItem(listingId){
  //   return this.jsonp.request(`${this.privateUrl}/listings/${listingId}.js?callback=JSONP_CALLBACK&${this.key}&includes=MainImage`, {method: 'Get'})
  //     .map(res => res.json());
  // }
  // logError(err) {
  //   console.error('There was an error: ' + err);
  // }
  

}
