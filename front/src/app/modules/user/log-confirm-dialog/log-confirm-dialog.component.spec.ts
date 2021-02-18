import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogConfirmDialogComponent } from './log-confirm-dialog.component';

describe('LogConfirmDialogComponent', () => {
  let component: LogConfirmDialogComponent;
  let fixture: ComponentFixture<LogConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
