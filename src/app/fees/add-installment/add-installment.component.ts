import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';
import { FeesService } from '../fees.service';
import { AddFeeInstallmentData } from '../model/addfeeInstallmentdata';
import { FeeInstallmentListData } from '../model/feeinstlistdata';
import { DeleteFeeInstallmentComponent } from './dialog/delete-fee-installment/delete-fee-installment.component';

@Component({
  selector: 'app-add-installment',
  templateUrl: './add-installment.component.html',
  styleUrls: ['./add-installment.component.sass']
})
export class AddInstallmentComponent implements OnInit {

  feeMonthlyInstallment= [
  {monthID : 1 , monthName: "April"},
  {monthID : 2 , monthName: "May"},
  {monthID : 3 , monthName: "June"},
  {monthID : 4 , monthName: "July"},
  {monthID : 5 , monthName: "August"},
  {monthID : 6 , monthName: "September"},
  {monthID : 7 , monthName: "October"},
  {monthID : 8 , monthName: "Novemeber"},
  {monthID : 9 , monthName: "Decemeber"},    
  {monthID : 10 ,monthName: "January"},
  {monthID : 11 ,monthName: "February"},
  {monthID : 12 ,monthName: "March"},
]
  addFeeInstallment:FormGroup;
  editFeeInstallmentData:FormGroup;
  installmentLastDate:any;
  errorMonthlyInstallment : Boolean = false;
  instMonths : any;
  feeInstList: FeeInstallmentListData[];    
  isTableHasData = true;

  isEdit:number = 0;
  
  filteredMonthlyInstallment = [];
  displayedColumns: string[] = ['id', 'installmentName', 'instLastDate', 'installMonths','actions'];
  dataSource: MatTableDataSource<FeeInstallmentListData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     private fb:FormBuilder,
     private datepipe:DatePipe,
     private feeService : FeesService,
     private stringUtils:StringUtils,
     public dialog: MatDialog
    ) { 
      this.getAllInstallmentMonth();
      this.getFeeInstallmentList();
    }
        

    public getFeeInstListData()
    {
     this.dataSource = new MatTableDataSource(this.feeInstList);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    }

    ngAfterViewInit() {}

    isTableSearchData = true;
    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.filteredData.length > 0) {
        this.isTableSearchData = true;
    } else {
        this.isTableSearchData = false;
      }
    }

  ngOnInit(): void {

    this.addFeeInstallment = this.fb.group({
      installmentName: ['', [Validators.required]],
      instLastDate: ['', [Validators.required]],
      monthlyInst: ['', [Validators.required]]
    })

    this.editFeeInstallmentData = this.fb.group({
      installmentName: ['', [Validators.required]],
      instLastDate: ['', [Validators.required]],
      
    })
  }

  getFeeInstallmentList()
  {
    var jsonData;
    var parseData;

    this.feeService.getFeeInstallmentList()
    .subscribe(res => {
      console.log(res);
      jsonData = JSON.stringify(res);
      parseData = JSON.parse(jsonData);
      if(parseData.statusCode == 200)
      {
        this.isTableHasData = true;
        this.feeInstList = parseData.data;
        this.getFeeInstListData();
      }
      else
      {
        this.isTableHasData = false;
      }
    },(err: HttpErrorResponse) => {
      alert("There is some error while getting fees Installment list from database.");
    }) 
  }

  selectInstMonths(e)
  {
    let selectedValue = e.value
    //console.log(selectedValue);
    if(selectedValue?.length)
    {
      let countArr = selectedValue.map(item => item.monthID);
      let max = Math.max(...countArr);
      //console.log(this.filteredMonthlyInstallment);
      let newValues = this.filteredMonthlyInstallment.filter(item => item.monthID <= max);
      //console.log(newValues);
      this.addFeeInstallment.patchValue({ monthlyInst: newValues });
    }
    else{
      this.addFeeInstallment.patchValue({ monthlyInst: [] } );
    }
  }

  getAllInstallmentMonth()
  {
    let flag = 0; 
    this.feeService.getAllInstallmentMonth()
     .subscribe(res => {
       let installmentMonth = res;
       let getSplitMonth = installmentMonth.split(",");

       this.filteredMonthlyInstallment = this.feeMonthlyInstallment.filter((item) => !getSplitMonth.includes(item.monthName));
     },(err: HttpErrorResponse) => {
      alert("There is some error while getting fees Installment from database.");
     })
  }

  onSubmit(addFeeInstallmentData:AddFeeInstallmentData)
  {
    
    let selectedInstallmentMonth = [];

    //  change date format in Installment Last date field
    this.installmentLastDate =this.datepipe.transform(addFeeInstallmentData.instLastDate, 'yyyy/MM/dd');
    addFeeInstallmentData.instLastDate = this.installmentLastDate;

    addFeeInstallmentData.monthlyInst.forEach((data:any) => {
        selectedInstallmentMonth.push(data.monthName);
    })

    this.instMonths = selectedInstallmentMonth.join();

    // JSON creation for sending data to API
    let feeInstallmentJSon = { 
      installmentName: addFeeInstallmentData.installmentName,
      instLastDate: addFeeInstallmentData.instLastDate,
      installMonths:  this.instMonths
    } 
  
    this.feeService.addFeesInstallmentData(feeInstallmentJSon)
    .subscribe(res => {
      //console.log(res);
      this.getAllInstallmentMonth();
      this.getFeeInstallmentList();
      this.stringUtils.createFeeInstallmentSuccessMsg();
      let feeDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
      feeDataReset.click();
    },(err: HttpErrorResponse) => {
      alert("There is some error while adding fees Installment in database. ");
    })
  }

  deleteFeeInstallment(rowId)
  {
    const dialogRef = this.dialog.open(DeleteFeeInstallmentComponent, {
      data: rowId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) 
      {
         this.feeService.deleteFeeInstallment(rowId.id)
         .subscribe(res => { 
          this.getAllInstallmentMonth(); 
          this.getFeeInstallmentList();
         this.stringUtils.deleteFeeInstallmentSuccessMsg();
       },(err: HttpErrorResponse) => {
        alert("There is some error while delete fee installment in database. ");
       })
      }
    });
  }

  editFeeInstallment(rowData)
  {
    this.isEdit = rowData.id; 
    this.editFeeInstallmentData.patchValue({...rowData, instLastDate: new Date(rowData.instLastDate)});
    console.log(rowData);
    console.log(this.editFeeInstallmentData.value);
  }

  editFeeInstallmentRow(rowData)
  {
    let newFeeInstallmentData = this.editFeeInstallmentData.value; 

    //  change date format in Installment Last date field
    this.installmentLastDate =this.datepipe.transform(newFeeInstallmentData.instLastDate, 'yyyy/MM/dd');
    newFeeInstallmentData.instLastDate = this.installmentLastDate;

    let editFeeInstallmentDataRow = {
      id : rowData.id,
      installmentName: newFeeInstallmentData.installmentName,
      instLastDate: newFeeInstallmentData.instLastDate,
    }
    
    this.feeService.editFeeInstallmentRow(editFeeInstallmentDataRow)
    .subscribe(res => {
      console.log(res);
      this.getFeeInstallmentList();
      this.isEdit = 0;
    },(err:HttpErrorResponse) => {

      alert("There is some error while edit fee installment in database. ");
    })
  }

  clearFeeInstallmentRow()
  {
    this.isEdit = 0;
    this.editFeeInstallmentData.reset();
  }
}

