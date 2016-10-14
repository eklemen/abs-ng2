import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../shared/api.service';
import { Album } from '../shared/types/albums';
import {LoadingPage} from '../shared/loading/loading';
// import { ProgressbarModule } from 'ng2-bootstrap/components/progressbar';

@Component({
  selector: 'abs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends LoadingPage implements OnInit {
  public albums: Album[];
  private selectedAlbum: Album;
  errorMessage: string;

  constructor(
      private apiService: ApiService,
      private router: Router
  ) {
    super(true);
  }

  getAlbums() {
    this.apiService.getAlbums()
        .subscribe(
            (ablums: any) => {
              console.log('all albums from home', ablums);
              this.ready();
              return this.albums = ablums;
            },
            error =>  this.errorMessage = <any>error);
  }

  onSelect ( album: Album) {
    this.selectedAlbum = album;
    this.getSingleAlbum(this.selectedAlbum.id);
  }

  getSingleAlbum(albumId): void {
    console.log('this.selectedAlbum.id', this.selectedAlbum.id);
    this.router.navigate(['album/', albumId]);
  }

  ngOnInit() {
    this.getAlbums();
  }

}
