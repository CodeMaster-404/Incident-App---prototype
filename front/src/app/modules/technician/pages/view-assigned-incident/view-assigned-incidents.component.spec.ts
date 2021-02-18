import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedIncidentsComponent } from './view-assigned-incidents.component';

describe('ViewAssignedIncidentsComponent', () => {
  let component: ViewAssignedIncidentsComponent;
  let fixture: ComponentFixture<ViewAssignedIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedIncidentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
