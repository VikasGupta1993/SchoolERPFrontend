import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { MatTableDataSource } from '@angular/material/table';
import { StudentListData } from '../model/studentlistdata';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass'],
})
export class AllStudentsComponent implements OnInit {

  studentList : StudentListData[];
  isTableHasData = true;
  public studentImages : any=[];

  displayedColumns : string[] = [
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
  ){
    this.getStudentList();
  }

  getStudentListData()
  {
    this.dataSource = new MatTableDataSource(this.studentList);
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

    editStudentData(rowData)
    {
    
    }

    deleteStudentData(rowId)
    {
      this.studentService.deleteStudentData(rowId.admissionNo)
      .subscribe(res => {
        console.log(res);
        this.getStudentList();
      },(err :HttpErrorResponse) => {
        console.log("Error while deleting Student Data");
      });
    }

    addNewStudent() {
      this.router.navigate(['/students/add-student']);
    }

    refreshStudentList() {
    
    }
}
