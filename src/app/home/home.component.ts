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

  getAlbums() {
    this.apiService.getAlbums()
                     .subscribe(
                       (ablums: any) => {
                        console.log('all albums from home', ablums);
                        return this.albums = ablums
                      },
                     error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    console.log('Hello Home');
    this.getAlbums();
  }

}
