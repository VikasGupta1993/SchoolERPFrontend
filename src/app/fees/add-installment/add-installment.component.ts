import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeesService } from '../fees.service';
import { AddFeeInstallmentData } from '../model/addfeeInstallmentdata';

@Component({
  selector: 'app-add-installment',
  templateUrl: './add-installment.component.html',
  styleUrls: ['./add-installment.component.sass']
})
export class AddInstallmentComponent implements OnInit {

  feeMonthlyInstallment= [
  {monthName: "April" , count : 1},
  {monthName: "May" , count : 2},
  {monthName: "June" , count : 3},
  {monthName: "July" , count : 4},
  {monthName: "August" , count : 5},
  {monthName: "September" , count : 6},
  {monthName: "October" , count : 7},
  {monthName: "Novemeber" , count : 8},
  {monthName: "Decemeber" , count : 9},
  {monthName: "January" , count : 10},
  {monthName: "February" , count : 11},
  {monthName: "March" , count : 12},
]
  addFeeInstallment:FormGroup;
  installmentLastDate:any;
  errorMonthlyInstallment : Boolean = false;

  constructor(
     private fb:FormBuilder,
     private datepipe:DatePipe,
     private feeService : FeesService
    ) { }

  ngOnInit(): void {

    this.addFeeInstallment = this.fb.group({
      installmentName: ['', [Validators.required]],
      instLastDate: ['', [Validators.required]],
      monthlyInst: ['', [Validators.required]]
    })
  }

  monthlyInstValidation(monthlyInst: any){   
    let firstMonthCount =  monthlyInst[0].count;
    monthlyInst.forEach(data => {
      if(firstMonthCount === data.count)
      {
        firstMonthCount++;
      }
      else{
        this.errorMonthlyInstallment = true;
        console.log("there is no skip in month");
        return;
      }
    })
  }

  onSubmit(addFeeInstallmentData:AddFeeInstallmentData)
  {
    //  change date format in Installment Last date field
    this.installmentLastDate =this.datepipe.transform(addFeeInstallmentData.instLastDate, 'yyyy/dd/MM');
    addFeeInstallmentData.instLastDate = this.installmentLastDate;

    //Monthly Installment Validation
    this.monthlyInstValidation(addFeeInstallmentData.monthlyInst);
  
   this.feeService.addFeesInstallmentData(JSON.stringify(addFeeInstallmentData))
    .subscribe(res => {
      console.log(res);
    },(err: HttpErrorResponse) => {
      alert("There is some error while adding fees Installment in database. ");
    })
  }
}

