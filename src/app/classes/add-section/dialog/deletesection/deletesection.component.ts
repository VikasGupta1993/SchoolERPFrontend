import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletesection',
  templateUrl: './deletesection.component.html',
  styleUrls: ['./deletesection.component.sass']
})
export class DeletesectionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletesectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
