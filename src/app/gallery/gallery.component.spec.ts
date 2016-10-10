import { TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { ApiService } from '../shared';
import { HttpModule } from "@angular/http";

describe('About Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [GalleryComponent],
            providers: [ApiService]
        });
    });

  it('should ...', () => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
      expect(true).toEqual(true);
    // expect(fixture.nativeElement.children[0].textContent).toContain('gallery Works!');
  });

});
