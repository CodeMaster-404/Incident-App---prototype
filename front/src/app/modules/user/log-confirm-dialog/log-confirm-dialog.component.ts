import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-log-confirm-dialog',
  templateUrl: './log-confirm-dialog.component.html',
  styleUrls: ['./log-confirm-dialog.component.css']
})
export class LogConfirmDialogComponent implements OnInit {

  title: string = "";
  message: string = "";
  constructor(public dialogRef: MatDialogRef<LogConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  

}
