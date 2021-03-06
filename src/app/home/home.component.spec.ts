// // This shows a different way of testing a component, check about for a simpler one
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { By } from '@angular/platform-browser';
// import { Location } from '@angular/common';
// import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
//
// import { HomeComponent } from './home.component';
//
// describe('Home Component', () => {
//   const html = '<abs-home></abs-home>';
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({declarations: [
//         HomeComponent,
//         TestComponent,
//         RouterTestingModule.withRoutes([
//         { path: 'settings/:collection/edit/:item', component: TestComponent }
//       ])
//     ]});
//     TestBed.overrideComponent(TestComponent, { set: { template: html }});
//   });
//
//   // it('should ...', () => {
//   //   const fixture = TestBed.createComponent(TestComponent);
//   //   fixture.detectChanges();
//   //   // expect(fixture.nativeElement.children[0].textContent).toContain('Home Works!');
//   //   expect(fixture.nativeElement.children[0].textContent).toContain('Home Works!');
//   // });
//
//   it('should go to url', async(inject([Router, Location], (router: Router, location: Location) => {
//     let fixture = TestBed.createComponent(TestComponent);
//     fixture.detectChanges();
//       expect(true).toEqual(true);
//
//     // fixture.debugElement.query(By.css('button.btn-primary')).nativeElement[0].click();
//     fixture.whenStable().then(() => {
//       expect(location.path()).toEqual('/gallery');
//       console.log('after expect');
//     });
//   })));
//
// });
//
// @Component({selector: 'abs-test', template: ''})
// class TestComponent { }


///////////////////////////////////////////////////
//////////////////////////////////////////////////
import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';


describe('Home', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HomeComponent],
            providers: [provideRoutes([])]
        });
    });

    it('should have an url', () => {
        let fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        expect(true).toEqual(true);
        fixture.debugElement.query(By.css('button.btn-primary')).nativeElement.click();
    });

});