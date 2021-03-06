import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../shared/api.service';
import { AlbumDetail } from '../shared/types/albums';
import {LoadingPage} from '../shared/loading/loading';
// import { ProgressbarModule } from 'ng2-bootstrap/components/progressbar';

@Component({
  selector: 'abs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends LoadingPage implements OnInit {
  public albums: AlbumDetail[];
  private selectedAlbum: AlbumDetail;
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
              this.ready();
              return this.albums = ablums;
            },
            error =>  this.errorMessage = <any>error);
  }

  onSelect ( album: AlbumDetail) {
    this.selectedAlbum = album;
    this.getSingleAlbum(this.selectedAlbum.id);
  }

  getSingleAlbum(albumId): void {
    this.router.navigate(['album/', albumId]);
  }

  ngOnInit() {
    this.getAlbums();
  }

}
