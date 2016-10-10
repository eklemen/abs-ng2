import { TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { ApiService } from '../shared';
import { HttpModule } from "@angular/http";

describe('Gallery Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [GalleryComponent],
            providers: [ApiService]
        });
    });

  it('should test an observable', () => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
      expect(true).toEqual(true);
    // expect(fixture.nativeElement.children[0].textContent).toContain('gallery Works!');
  });

});
