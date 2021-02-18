import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Incident } from 'src/app/core/models/incident.model';

export interface AcceptDialogData {
  acceptReject: boolean;
  incident: Incident;
}

export interface AcceptDialogDataResult {
  acceptReject: boolean;
  reason: string;
}

@Component({
  selector: 'app-accept-reject-dialog',
  templateUrl: './accept-reject-dialog.component.html',
  styleUrls: ['./accept-reject-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcceptRejectDialogComponent implements OnInit {

  acceptReject = false;
  acceptRejectString = '';
  incident: Incident;

  reasonFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<AcceptRejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AcceptDialogData)
  {
    this.incident = data.incident;
    this.acceptReject = data.acceptReject;
    if (this.acceptReject) {
      this.acceptRejectString = 'accept';
    }
    else {
      this.acceptRejectString = 'reject';
    }
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {

    if (!this.acceptReject) {
      // Rejecting
      if (!this.reasonFormControl.errors) {
        const results: AcceptDialogDataResult = { acceptReject: this.acceptReject, reason: this.reasonFormControl.value};
        this.dialogRef.close(results);
      }
    } else {
      // Accepting
      const results: AcceptDialogDataResult = { acceptReject: this.acceptReject, reason: ''};
      this.dialogRef.close(results);
    }

  }
}
