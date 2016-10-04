import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Album, RootObject } from '../shared/albums';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public albums : Album[];
  public response : RootObject;
  errorMessage: string;
  mode = 'Observable';

  constructor(private apiService: ApiService) {
    // Do stuff
  }

  getHeroes() {
    this.apiService.getAlbums()
                     .subscribe(
                       (ablums: any) => {
                        console.log(ablums);
                        return this.albums = ablums
                      })
                      //  error =>  this.errorMessage = <any>error);
                      //  ubscribe(listings => {console.log(listings); return this.listings = listings.results}); 
  }

  ngOnInit() {
    console.log('Hello Home');
    this.getHeroes();
  }

}
