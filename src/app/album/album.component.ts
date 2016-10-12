import { Component, OnInit } from '@angular/core';
import { Album } from '../shared/albums';
import { Router, Params, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'abs-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public album: Album[];
  errorMessage: string;

  constructor(
      private apiService: ApiService,
      private route: ActivatedRoute,
      private location: Location
  ) {}

  // getSingleAlbum(albumId) {
  //   this.apiService.getSingleAlbum(albumId)
  //       .subscribe(
  //           (ablum: any) => {
  //             console.log('simgle album from albumComponent', ablum);
  //             return this.album = ablum;
  //           },
  //           error =>  this.errorMessage = <any>error);
  // }

  ngOnInit(): void {
    this.apiService.getSingleAlbum('someid');
    // this.route.params.forEach((params: Params) => {
    //   let id:any = +params['id'];
    //   this.apiService.getSingleAlbum(id)
    //       .subscribe((album: any) => {debugger;})
    // });
  }

}
