import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { MatTableDataSource } from '@angular/material/table';
import { StudentListData } from '../model/studentlistdata';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass'],
})
export class AllStudentsComponent implements OnInit {

  studentList : StudentListData[];
  isTableHasData = true;
  public studentImages : any=[];

  delMultipleStud = [];

  //multiple Row delete
  selection = new SelectionModel<StudentListData>(true, []);
  data:any;
  
 
  displayedColumns : string[] = [
    'select',
    'uploadImg',
    'admissionNo',
    'academicYear',
    'Name',
    'gender',
    'className',
    'sectionName',
    'rollNo',
    'admissionDate',
    'actions',
  ];   

  dataSource: MatTableDataSource<StudentListData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(){}

  constructor(
    private studentService : StudentService,
    private stringUtils : StringUtils,
    private router : Router,
    public dialog: MatDialog,
  ){
    this.getStudentList();
  }

  getStudentListData()
  {
    this.dataSource = new MatTableDataSource(this.studentList);
    console.log("Stu"+this.studentList);
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

    getStudentList()
    {
      var jsonData;
      var parseData;
      

      this.studentService.getAllStudentData()        
       .subscribe(res => {

         console.log(res);
         jsonData = JSON.stringify(res);
         parseData = JSON.parse(jsonData);  

         // Iterating Student Image
         parseData.data.forEach(data=> {
          data.uploadImg = 'data:image/png;base64,' + data.uploadImg;
         })
        
         if(parseData.statusCode == 200)
         {
           this.isTableHasData = true;
           this.studentList = parseData.data;
           //multiple Row delete
           this.data = Object.assign( this.studentList);
           this.getStudentListData();
         }
         else
         {
          this.isTableHasData = false; 
         }
       },(err: HttpErrorResponse) => {
        this.stringUtils.errorClassListMsg();
       });
    }

    

    deleteStudentData(rowId)
    {
      const dialogRef  = this.dialog.open(DeleteDialogComponent, {
        data: rowId,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result === 1)
        {
           //API for delete Single data
          this.studentService.deleteStudentData(rowId.admissionNo)
          .subscribe(res => {
           console.log(res);
           this.selection = new SelectionModel<StudentListData>(true, []);
           this.getStudentList();
           this.stringUtils.deleteStudentSuccessMsg();
        },(err :HttpErrorResponse) => {
           console.log("Error while deleting Student Data");
          })
        }
      });
    }

    addNewStudent() {
      this.router.navigate(['/students/add-student']);
    }

    refreshStudentList() {
    
    }

  // Below 3 methods define to delete multiple rows
    removeSelectedRows() {
      const totalSelect = this.selection.selected.length;
      console.log(totalSelect);
      this.delMultipleStud = [];
      console.log("totalSelect "+totalSelect);
      this.selection.selected.forEach(item => {
       let index: number = this.data.findIndex(d => d.admissionNo == item.admissionNo);
       console.log(index);
       this.delMultipleStud.push(this.data[index].admissionNo);
     });

     //API for delete multiple data
     this.studentService.deleteStudentData(this.delMultipleStud.toString())
      .subscribe(res => { 
        console.log(res);
        this.selection = new SelectionModel<StudentListData>(true, []);
        this.getStudentList();
        this.stringUtils.deleteMultipleStudentSuccessMsg(totalSelect);
      },(err:HttpErrorResponse) => {
        alert("There is some error while deleting multiple student in database. ");
      }); 
    }

    masterToggle() {
      this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.dataSource.data.length;
     return numSelected === numRows;
    }

    editStudentData(rowData)
    {
     console.log(rowData);
    }
}
