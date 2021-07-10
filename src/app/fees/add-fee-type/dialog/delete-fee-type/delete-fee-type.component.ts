import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-fee-type',
  templateUrl: './delete-fee-type.component.html',
  styleUrls: ['./delete-fee-type.component.sass']
})
export class DeleteFeeTypeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteFeeTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
