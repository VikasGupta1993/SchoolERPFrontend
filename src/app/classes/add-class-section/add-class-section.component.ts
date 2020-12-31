import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';
import { ClassService } from '../class.service';
import { AddClassSectionData } from '../model/add_class_section_data';
import { ClassListData } from '../model/classlistdata';
import { ClassSectionListData } from '../model/class_section_list_data';
import { SectionListData } from '../model/sectionlistdata';
import { DeleteclasssectionComponent } from './dialog/deleteclasssection/deleteclasssection.component';

@Component({
  selector: 'app-add-class-section',
  templateUrl: './add-class-section.component.html',
  styleUrls: ['./add-class-section.component.sass']
})
export class AddClassSectionComponent implements OnInit {

  addClassSectionForm:FormGroup;
  classList:ClassListData[];
  sectionList:SectionListData[];

  classSectionData: ClassSectionListData;
  classSectionList: ClassSectionListData[] 
  isEdit: Boolean = false;
  editClassSectionInfo:ClassSectionListData;
  isTableHasData = true;


  ngOnInit(): void {
    this.addClassSectionForm = this.fb.group({
      className:['',[Validators.required]],
      sectionName:['',[Validators.required]],
      classTeacher:['',[Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      strength:['', [Validators.required,Validators.pattern('^[0-9]*$')]]
    })
    this.getAllClass();
    this.getAllSection();
  }

  displayedColumns: string[] = ['id','className', 'sectionName', 'classTeacher', 'strength','actions'];
  dataSource: MatTableDataSource<ClassSectionListData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb:FormBuilder,
    private classService:ClassService,
    private stringUtils:StringUtils,
    public dialog: MatDialog
  ) {
    this.getClassSectionList();
  }

  public getClassSectionListData()
  {
    this.dataSource = new MatTableDataSource(this.classSectionList);
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

  getAllClass() 
  {
    this.classService.getAllClassList()
    .subscribe((res:any) => {
      console.log(res);
      this.classList = res.data;
    },(err:HttpErrorResponse) => {
      alert("There is some error while getting class List in database.");
    })
  }

  getAllSection()
  {
    this.classService.getAllSectionList()
    .subscribe((res:any) => {
      this.sectionList = res.data;
    },(err:HttpErrorResponse) => {
      alert("There is some error while getting section List in database.");
    })
  }

  public getClassSectionList() {
    var jsonData;
    var parseData;

    this.classService.getAllClassSectionList()
      .subscribe(res => {
        console.log(res);
        jsonData = JSON.stringify(res);
        parseData = JSON.parse(jsonData);
        if(parseData.statusCode == 200)
        {
          this.isTableHasData = true;
          this.classSectionList = parseData.data;
          this.getClassSectionListData();
        }
        else
        {
          this.isTableHasData = false;
        }
      },(err: HttpErrorResponse) => {
        this.stringUtils.errorClassSectionListMsg();
     });
  }

  onSubmit(addClassSecData:AddClassSectionData)
  {
    if(this.isEdit == false)
    {
      this.classService.addNewClassSectionData(addClassSecData)
      .subscribe(res => {
         console.log(res);
         this.getClassSectionList();
         this.stringUtils.createClassSectionSuccessMsg();
         let classsectionDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
         classsectionDataReset.click();
      },(err:HttpErrorResponse) => {
        alert("There is some error while adding class section in database. "); 
      })
    }
    else
    {
      let id = this.editClassSectionInfo.id;
      this.editClassSectionInfo = {...addClassSecData,id};
      console.log(this.editClassSectionInfo);
      this.classService.editClassSectionDatainfo(this.editClassSectionInfo)
      .subscribe(res =>{
        console.log(res);
        this.getClassSectionList();
        this.stringUtils.editClassSectionSuccessMsg();
         let classsectionDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
         classsectionDataReset.click();
      },(err: HttpErrorResponse) => {
        alert("There is some error while editing class section in database. ");
      })
    }
  }

  deleteClassSection(rowId)
  {
    const dialogRef = this.dialog.open(DeleteclasssectionComponent, {
      data: rowId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) 
      {
         this.classService.deleteClassSectionData(rowId.id)
         .subscribe(res => {
          this.getClassSectionList();
         this.stringUtils.deleteClassSectionSuccessMsg();
       },(err: HttpErrorResponse) => {
        alert("There is some error while delete class section in database. ");
       })
      }
    });
  }

  resetbtn()
  {
    this.isEdit = false; 
  }

  editClassSectionData(rowData)
  {
    this.addClassSectionForm.patchValue({...rowData});
    // Below line required for getting id in line number 116
    this.editClassSectionInfo = rowData;
    this.isEdit = true; 
  }
}
