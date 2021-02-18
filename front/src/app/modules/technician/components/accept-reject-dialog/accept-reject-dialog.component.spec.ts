import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectDialogComponent } from './accept-reject-dialog.component';

describe('AcceptRejectDialogComponent', () => {
  let component: AcceptRejectDialogComponent;
  let fixture: ComponentFixture<AcceptRejectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRejectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRejectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
