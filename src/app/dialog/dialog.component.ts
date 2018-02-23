import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public thisDialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit() {
  }
  onCloseConfirm():void{
    this.thisDialogRef.close();
  }
}
