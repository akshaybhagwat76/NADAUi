import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
   name: string;
}


@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {debugger }
  ngOnInit() {
  }

}
