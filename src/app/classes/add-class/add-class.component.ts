import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';
import { ClassService } from '../class.service';
import { ClassListData } from '../model/classlistdata';
import { AddClassData  } from '../model/addclassdata';
import { DeleteComponent } from './dialog/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {

  addClassForm: FormGroup;
  classData: ClassListData;
  classList: ClassListData[] 
  isEdit: Boolean = false;
  editClassinfo:ClassListData;
  isTableHasData = true;


  ngOnInit(){
    this.addClassForm = this.fb.group({
      className: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      abbreviation: ['', [Validators.required]],
      priority: ['', [Validators.required,Validators.pattern('^[0-9]*$')]]
    });
  }

  displayedColumns: string[] = ['id', 'className', 'abbreviation', 'priority','actions'];
  dataSource: MatTableDataSource<ClassListData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private classService : ClassService,
    private stringUtils:StringUtils,
    public dialog: MatDialog,){
   this.getclassList();
  }


  public getClassListData()
  {
    this.dataSource = new MatTableDataSource(this.classList);
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

  /** Builds and returns a new User. */
  public getclassList() {
    var jsonData;
    var parseData;

    this.classService.getAllClassList()
      .subscribe(res => {
        console.log(res);
        jsonData = JSON.stringify(res);
        parseData = JSON.parse(jsonData);
        if(parseData.statusCode == 200)
        {
          this.isTableHasData = true;
          this.classList = parseData.data;
          this.getClassListData();
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

  onSubmit(addClassData:AddClassData)
  {
    if(this.isEdit == false)
    {
      console.log(addClassData);
      this.classService.addNewClassData(addClassData)
      .subscribe(res => {
        console.log(res);
       this.getclassList();
       this.stringUtils.createClassSuccessMsg();
       let classDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
       classDataReset.click();
      },(err: HttpErrorResponse) => {
        alert("There is some error while adding class in database. "); 
      }); 
    }
    else
    {
      let id = this.editClassinfo.id;
      this.editClassinfo = {...addClassData,id};
      console.log(this.editClassinfo);
      this.classService.editClassDatainfo(this.editClassinfo)
      .subscribe(res =>{
        console.log(res);
        this.getclassList();
        this.stringUtils.editClassSuccessMsg();
         let classDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
         classDataReset.click();
      },(err: HttpErrorResponse) => {
        alert("There is some error while editing class in database. ");
      })
    }
  }

  deleteClass(rowId)
  {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: rowId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) 
      {
         this.classService.deleteClassData(rowId.id)
         .subscribe(res => {
         this.getclassList();
         this.stringUtils.deleteClassSuccessMsg();
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

  editClassData(rowData)
  {
    this.addClassForm.patchValue({...rowData});
    // Below line required for getting id in line number 116
    this.editClassinfo = rowData;
    this.isEdit = true; 
  }
}

