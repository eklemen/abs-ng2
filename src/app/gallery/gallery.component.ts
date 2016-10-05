import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Album } from '../shared/albums';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'abs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public albums: Album[];
  errorMessage: string;

  constructor(private apiService: ApiService) {
    // Do stuff
  }

  getAlbums() {
    this.apiService.getAlbums()
        .subscribe(
            (ablums: any) => {
              console.log('all albums from home', ablums);
              return this.albums = ablums;
            },
            error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getAlbums();
  }

}
