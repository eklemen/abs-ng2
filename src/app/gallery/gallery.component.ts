import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Album } from '../shared/albums';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'abs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public albums: Album[];
  private selectedAlbum: Album;
  errorMessage: string;

  constructor(
      private apiService: ApiService,
      private router: Router
  ) {}

  getAlbums() {
    this.apiService.getAlbums()
        .subscribe(
            (ablums: any) => {
              console.log('all albums from home', ablums);
              return this.albums = ablums;
            },
            error =>  this.errorMessage = <any>error);
  }

  onSelect(album: Album){
    this.selectedAlbum = album;
    this.getSingleAlbum(this.selectedAlbum.id);
  }

  getSingleAlbum(albumId): void {
    console.log('passed in value', albumId);
    console.log('this.selectedAlbum.id', this.selectedAlbum.id);
    this.router.navigate(['album/', albumId])
    // this.apiService.getSingleAlbum(albumId)
    //     .subscribe(
    //         (ablum: any) => {
    //           console.log('simgle album from albumComponent', ablum);
    //           return this.album = ablum;
    //         },
    //         error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getAlbums();
  }

}
