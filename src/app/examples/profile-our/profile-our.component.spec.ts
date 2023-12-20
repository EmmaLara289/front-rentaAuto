import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOurComponent } from './profile-our.component';

describe('ProfileOurComponent', () => {
  let component: ProfileOurComponent;
  let fixture: ComponentFixture<ProfileOurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileOurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
