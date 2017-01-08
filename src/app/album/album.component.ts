import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {ApiService} from '../shared/api.service';
import {LoadingPage} from '../shared/loading/loading';
import {SingleAlbum, PhotoDetail} from '../shared/types/albums';

@Component({
    selector: 'abs-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent extends LoadingPage implements OnInit {
    public album: SingleAlbum;
    public albumTitle: string;
    public images: PhotoDetail[];
    errorMessage: string;
    openModalWindow: boolean = false;
    imagePointer: number;

    constructor(private apiService: ApiService,
                private route: ActivatedRoute,
                private location: Location) {
        super(true);
    }

    OpenImageModel(imageSrc, images) {
        let imageModalPointer;
        for (let i = 0; i < images.length; i++) {
            if (imageSrc === images[i].link) {
                imageModalPointer = i;
                break;
            }
        }
        this.openModalWindow = true;
        this.images = images;
        this.imagePointer = imageModalPointer;
    }

    cancelImageModel() {
        this.openModalWindow = false;
    }

    getAlbumImages() {
        this.route.params.forEach((params: Params) => {
            let id: string = params['id'];
            this.apiService.getSingleAlbum(id)
                .subscribe(
                    (album: SingleAlbum) => {
                        this.albumTitle = album.title;
                        this.images = album.images;
                        this.ready();
                        return;
                    },
                    error => this.errorMessage = <any>error
                );
        });
    }

    ngOnInit(): void {
        this.getAlbumImages();
    }

}
