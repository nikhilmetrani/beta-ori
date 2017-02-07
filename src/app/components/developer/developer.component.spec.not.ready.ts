// import {
//   TestBed,
//   async,
//   inject
// } from '@angular/core/testing';
// import {RouterTestingModule} from '@angular/router/testing';
// import {DeveloperProfile, ProfileService} from '../../core';
// import {DeveloperComponent, DeveloperWelcomeComponent} from '../';
// import {Router} from '@angular/router';
// // import {Observable} from 'rxjs/Observable';

// class MockRouter {
//     navigate = jasmine.createSpy('navigate');
//   }

// class MockProfileService {
//   getDeveloperProfile(developerId: number) {
//       let developerProfile: DeveloperProfile = {
//           rid: developerId,
//           website: 'https://test.com',
//           company: 'Test company',
//           description: 'Test description',
//           email: 'developer@test.com'
//       };
//     return developerProfile;
//   }
// }

// describe('DeveloperComponent Tests', () => {

//   let fixture;
//   const mockRouter = new MockRouter();
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         DeveloperComponent, DeveloperWelcomeComponent
//       ],
//       providers: [
//         { provide: ProfileService, useClass: MockProfileService },
//         { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
//       ],
//       imports: [
//           RouterTestingModule
//       ]
//     });
//     fixture = TestBed.createComponent(DeveloperComponent);
//     fixture.detectChanges();
//   });

//   it('Should get developer profile', async(inject([], () => {
//     fixture.componentInstance.getDeveloperProfile(2);
//     fixture.whenStable()
//       .then(() => {
//         fixture.detectChanges();
//         return fixture.whenStable();
//       })
//       .then(() => {
//         const compiled = fixture.debugElement.nativeElement;
//         // expect(compiled.querySelector('div').innerText).toEqual('Test quote');
//       });
//   })));
// });
