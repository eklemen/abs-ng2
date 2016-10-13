import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'abs-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public album: any;
  public albumTitle: string;
  public images: any[];
  errorMessage: string;

  constructor(
      private apiService: ApiService,
      private route: ActivatedRoute,
      private location: Location
  ) {}

    getAlbumImages(){
        this.route.params.forEach((params: Params) => {
            let id: any = params['id'];
            this.apiService.getSingleAlbum(id)
                .subscribe(
                    (album: any) => {
                        console.log('album', album);
                        this.albumTitle = album.title;
                        this.images = album.images;
                        return;
                    }
                );
        });
    }

  ngOnInit(): void {
    this.getAlbumImages()
  }

}
