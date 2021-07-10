import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-fee-installment',
  templateUrl: './delete-fee-installment.component.html',
  styleUrls: ['./delete-fee-installment.component.sass']
})
export class DeleteFeeInstallmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteFeeInstallmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
