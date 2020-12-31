import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';
import { ClassService } from '../class.service';
import { AddSectionData } from '../model/addsectiondata';
import { SectionListData } from '../model/sectionlistdata';
import { DeletesectionComponent } from './dialog/deletesection/deletesection.component';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.sass']
})
export class AddSectionComponent implements OnInit {

  

  addSectionForm: FormGroup;
  sectionData: SectionListData;
  sectionList: SectionListData[] 
  isEdit: Boolean = false;
  editsectionInfo:SectionListData;
  isTableHasData = true;


  ngOnInit(){
    this.addSectionForm = this.fb.group({
      sectionName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      abbreviation: ['', [Validators.required]],
      priority: ['', [Validators.required,Validators.pattern('^[0-9]*$')]]
    });
  }

  displayedColumns: string[] = ['id', 'sectionName', 'abbreviation', 'priority','actions'];
  dataSource: MatTableDataSource<SectionListData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private classService : ClassService,
    private stringUtils:StringUtils,
    public dialog: MatDialog,){
   this.getSectionList();
  }


  public getSectionListData()
  {
    this.dataSource = new MatTableDataSource(this.sectionList);
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
  public getSectionList() {
    var jsonData;
    var parseData;

    this.classService.getAllSectionList()
      .subscribe(res => {
        console.log("vikas");
        console.log(res);
        jsonData = JSON.stringify(res);
        parseData = JSON.parse(jsonData);
        if(parseData.statusCode == 200)
        {
          this.isTableHasData = true;
          this.sectionList = parseData.data;
          this.getSectionListData();
        }
        else
        {
          this.isTableHasData = false;
        }
      },(err: HttpErrorResponse) => {
        this.stringUtils.errorSectionListMsg();
     });
  }

  onSubmit(addSectionData:AddSectionData)
  {
    if(this.isEdit == false)
    {
      console.log(addSectionData);
      this.classService.addNewSectionData(addSectionData)
      .subscribe(res => {
        console.log(res);
       this.getSectionList();
       this.stringUtils.createSectionSuccessMsg();
       let sectionDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
       sectionDataReset.click();
      },(err: HttpErrorResponse) => {
        alert("There is some error while adding section in database. "); 
      }); 
    }
    else
    {
      let id = this.editsectionInfo.id;
      this.editsectionInfo = {...addSectionData,id};
      console.log(this.editsectionInfo);
      this.classService.editSectionDatainfo(this.editsectionInfo)
      .subscribe(res =>{
        console.log(res);
        this.getSectionList();
        this.stringUtils.editSectionSuccessMsg();
         let sectionDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
         sectionDataReset.click();
      },(err: HttpErrorResponse) => {
        alert("There is some error while editing section in database. ");
      })
    }
  }

  deleteSection(rowId)
  {
    const dialogRef = this.dialog.open(DeletesectionComponent, {
      data: rowId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) 
      {
         this.classService.deleteSectionData(rowId.id)
         .subscribe(res => {
         this.getSectionList();
         this.stringUtils.deleteSectionSuccessMsg();
       },(err: HttpErrorResponse) => {
        alert("There is some error while delete section in database. ");
       })
      }
    });
  }

  resetbtn()
  {
    this.isEdit = false; 
  }

  editSectionData(rowData)
  {
    this.addSectionForm.patchValue({...rowData});
    // Below line required for getting id in line number 116
    this.editsectionInfo = rowData;
    this.isEdit = true; 
  }
}

