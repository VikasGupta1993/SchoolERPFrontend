import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ClassService } from 'src/app/classes/class.service';
import { ClassListData } from 'src/app/classes/model/classlistdata';
import { SectionListData } from 'src/app/classes/model/sectionlistdata';
import { StringUtils } from 'src/app/utils/notificationUtils/StringUtils';
import { AddStudentData } from '../model/addstudent';
import { StudentService } from '../student.service';
import { DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass']
})
export class AddStudentComponent {

  stdForm: FormGroup;
  emailregex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  classList:ClassListData[];
  sectionList:SectionListData[];
  public studentImg:any = File;
  academicYear = ['2020-2021', '2019-2020','2018-2019'];

  //Admission date Validation
  admissionDate_TimeStamp : any ;
  DOB_TimeStamp : any;
  DOB_dates:any;
  admissionDates:any;
  admissionDateErrorMessage:Boolean;

  imageMaxSize: number = 1000000; // 1000000 is in byte form is equal to 1mb
  imageFileSize: number;
  imageSizeInMB: string; 

  ngOnInit(){
    this.stdForm = this.fb.group({
      academicYear:['',[Validators.required]],
      firstName:   ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      lastName:    [''],
      middleName : [''],
      className:   ['',[Validators.required]],
      sectionName: ['',[Validators.required]],
      rollNo:      ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender:      ['', [Validators.required]],
      email:       ['', [Validators.required, Validators.pattern(this.emailregex)]],
      mobile:      ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
    admissionDate: ['', [Validators.required]],
    landlineNumber:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      parentName:  ['', [Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      parentNumber:['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      studentDOB:  ['', [Validators.required]],
      bGroup:      [''],
      address:     ['',[Validators.required]],
      uploadImg:   ['',[Validators.required,FileValidator.maxContentSize(this.imageMaxSize)]]
    });
    this.getAllClass();
    this.getAllSection();
  }

  constructor(
    private fb: FormBuilder,
    private classService:ClassService,
    private studentService:StudentService,
    private stringUtils:StringUtils,
    private datepipe:DatePipe) 
    {}

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

  onFileChange(event) {    
    let files = event.target.files[0];
    this.imageFileSize = event.target.files[0].size;
    this.imageSizeInMB = (this.imageFileSize / (1024*1024)).toFixed(2);
    this.studentImg=files;
  }

  admissionDateValidation(admissionDates: any, DOB_dates: any) {
    //alert(12);
    console.log("Admision date1 "+admissionDates);
    console.log("DOB date1 "+DOB_dates);
    this.admissionDate_TimeStamp = new Date(admissionDates).getTime();
    this.DOB_TimeStamp = new Date(DOB_dates).getTime();
    console.log("Admision date12 "+this.admissionDate_TimeStamp);
    console.log("DOB date12 "+this.DOB_TimeStamp);
    const diffCheck = this.admissionDate_TimeStamp - this.DOB_TimeStamp;
    console.log("diffCheck.........."+diffCheck);
    if(diffCheck<94694400000)
    {
      //alert(12345);
      this.admissionDateErrorMessage = true; 
      this.stdForm.get('admissionDate').setErrors(Validators.pattern('Admission Date should be greater than 3 yr of DOB'));
    }
  }

  onSubmit(addStudentData:AddStudentData) {

    // Admission Date Validation

    //this.admissionDateValidation(addStudentData.admissionDate,addStudentData.studentDOB);

    this.admissionDates =this.datepipe.transform(addStudentData.admissionDate, 'yyyy/dd/MM');
    this.DOB_dates =this.datepipe.transform(addStudentData.studentDOB, 'yyyy/dd/MM');
    
    addStudentData.admissionDate = this.admissionDates;
    addStudentData.studentDOB = this.DOB_dates;


    // File name getting
    //addStudentData.uploadImg = this.studentImg;
    //console.log('Form Value', addStudentData);

    addStudentData.uploadImg='';
    const formData = new FormData();
    formData.append('studInfo',JSON.stringify(addStudentData));
    formData.append('studImg',this.studentImg);

    // Form Submission
    this.studentService.addNewStudent(formData)
    .subscribe(res => {
       console.log(res);
       this.stringUtils.createStudentSuccessMsg();
       let studentDataReset: HTMLElement = document.getElementById('btnreset') as HTMLElement;
       studentDataReset.click();
    },(err:HttpErrorResponse) => {
      alert("There is some error while adding student in database. ");
    });
  }
  
}
