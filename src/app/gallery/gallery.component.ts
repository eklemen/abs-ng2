import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Albums } from '../shared/albums';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'abs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public albums : Albums;
  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Gallery');
  }

}
