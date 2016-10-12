import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
