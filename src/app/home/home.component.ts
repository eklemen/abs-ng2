import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [RouterLink]
})
export class HomeComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
