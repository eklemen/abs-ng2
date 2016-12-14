import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isNotHome = false;

  constructor(private api: ApiService, private router:Router) {
  }

  checkRoute(){
    this.router.events.subscribe( event => {
      const regex = /^\/$/ig;
      if (event.url.match(regex) === null){
        this.isNotHome = true
      } else {
        this.isNotHome = false;
      }
    });
  }
  ngOnInit(){
    this.checkRoute();
  }
}
