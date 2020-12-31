import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteclasssection',
  templateUrl: './deleteclasssection.component.html',
  styleUrls: ['./deleteclasssection.component.sass']
})
export class DeleteclasssectionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteclasssectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
