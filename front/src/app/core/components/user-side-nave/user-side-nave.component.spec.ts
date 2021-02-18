import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSideNaveComponent } from './user-side-nave.component';

describe('UserSideNaveComponent', () => {
  let component: UserSideNaveComponent;
  let fixture: ComponentFixture<UserSideNaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSideNaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSideNaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
