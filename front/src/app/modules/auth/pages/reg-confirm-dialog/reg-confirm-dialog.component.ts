import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reg-confirm-dialog',
  templateUrl: './reg-confirm-dialog.component.html',
  styleUrls: ['./reg-confirm-dialog.component.css']
})
export class RegConfirmDialogComponent implements OnInit {

  //constructor() { }
  title: string = "";
  message: string = "";
  constructor(public dialogRef: MatDialogRef<RegConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
