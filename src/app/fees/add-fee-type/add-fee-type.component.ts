import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';
import { FeesService } from '../fees.service';
import { AddFeeTypeData } from '../model/addfeetypedata';
import { FeeTypeListData } from '../model/feetypelistdata';
import { DeleteFeeTypeComponent } from './dialog/delete-fee-type/delete-fee-type.component';

@Component({
  selector: 'app-add-fee-type',
  templateUrl: './add-fee-type.component.html',
  styleUrls: ['./add-fee-type.component.sass']
})
export class AddFeeTypeComponent implements OnInit {

  addFeeTypeForm:FormGroup;
  feeTypeListData : FeeTypeListData[];
  isTableHasData = true;
  isEdit: Boolean = false;
  editFeeTypeinfo : FeeTypeListData; 

  constructor(
    private fb:FormBuilder,
    private feeService : FeesService,
    private stringUtils:StringUtils,
    public dialog: MatDialog,) 
    { 
      this.getFeeComponentList();   
    }

  ngOnInit(): void {
    this.addFeeTypeForm = this.fb.group({
      feeType : ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      abbreviation: ['', [Validators.required]],
      priority: ['', [Validators.required,Validators.pattern('^[0-9]*$')]]
    });
  }

  displayedColumns: string[] = ['id', 'feeType', 'abbreviation', 'priority','actions'];
  dataSource: MatTableDataSource<FeeTypeListData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public getFeeTypeListData()
  {
    this.dataSource = new MatTableDataSource(this.feeTypeListData);
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

    public getFeeComponentList()
    {
      var jsonData;
      var parseData;
  
      this.feeService.getFeeTypeComponentData()
        .subscribe(res => {
          console.log(res);
          jsonData = JSON.stringify(res);
          parseData = JSON.parse(jsonData);
          if(parseData.statusCode == 200)
          {
            this.isTableHasData = true;
            this.feeTypeListData = parseData.data;
            this.getFeeTypeListData();
          }
          else
          {
            this.isTableHasData = false;
          }
        },(err: HttpErrorResponse) => {
          console.log(err);
          this.stringUtils.errorClassListMsg();
       });
    }

    deletefeeComponentData(rowId)
    {
      const dialogRef = this.dialog.open(DeleteFeeTypeComponent, {
        data: rowId,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 1) 
        {
           this.feeService.deleteFeeTypeComponent(rowId.id)
           .subscribe(res => {
           this.getFeeComponentList();
           this.stringUtils.deleteFeeComponentSuccessMsg();
         },(err: HttpErrorResponse) => {
          alert("There is some error while delete class in database. ");
         })
        }
      });
    }
  
    resetbtn()
    {
      this.isEdit = false; 
    }
  
    editfeeComponentData(rowData)
    {
      this.addFeeTypeForm.patchValue({...rowData});
      // Below line required for getting id in line number 116
      this.editFeeTypeinfo = rowData;
      this.isEdit = true; 
    }  

  onSubmit(feeTypeListData : AddFeeTypeData)
  {
    if(this.isEdit == false)
    {
      console.log(feeTypeListData);

      //JSON creation for sending data to API
      let addFeeTypeComponentData = {
        feeType : feeTypeListData.feeType,
        abbreviation : feeTypeListData.abbreviation,
        priority : feeTypeListData.priority
      }
  
      this.feeService.addFeeComponentData(addFeeTypeComponentData)
      .subscribe(res => {
        console.log(res);
        this.getFeeComponentList();
        this.stringUtils.createFeeComponentSuccessMsg();
        let classDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
        classDataReset.click();
      },(err:HttpErrorResponse) => {
        alert("There is some error while adding fee component in database. ");
      })
    }
    else
    {
      let id = this.editFeeTypeinfo.id;
      this.editFeeTypeinfo = {...feeTypeListData,id};
      console.log(this.editFeeTypeinfo);
      this.feeService.editFeeTypeComponent(this.editFeeTypeinfo)
      .subscribe(res => {
        console.log(res);
        this.getFeeComponentList();
        this.stringUtils.editFeeComponentSuccessMsg();
         let classDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
         classDataReset.click();
      },(err: HttpErrorResponse) => {
        alert("There is some error while editing Fee component in database. ");
      })
    }
  }
}


