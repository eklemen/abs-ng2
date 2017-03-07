import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isNotHome = false;

  constructor(private router: Router) {
  }

  checkRoute() {
    this.router.events.subscribe(event => {
      const regex = /^\/$/ig;
      if (event.url.match(regex) === null) {
        return this.isNotHome = true;
      }
      this.isNotHome = false;
    });
  }
  ngOnInit() {
    this.checkRoute();
  }
}
