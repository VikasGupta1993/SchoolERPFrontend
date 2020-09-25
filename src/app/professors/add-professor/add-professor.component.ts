import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProfessorDtls } from 'src/app/shared/models/addprofessor';
import { ErpHttpClientsService } from 'src/app/core/services/erp-http-clients.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from 'src/app/core/services/token.storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.sass']
})
export class AddProfessorComponent {

  proForm: FormGroup;
  fileName:string;

  constructor(
    private fb: FormBuilder,
    private erpHttpClientsService:ErpHttpClientsService,
    private tokenStorageData:TokenStorage,
    private router:Router)
    {}

  ngOnInit() {
    this.proForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastname: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      dob: ['', [Validators.required]],
      education: [''],
      uploadImg: ['']
    });
  }


  onFileChange(event) {    
    let files = event.target.files[0].name;
    this.fileName=files;
  }


  onSubmit(addProfessorDtls:AddProfessorDtls) 
  {

    addProfessorDtls.uploadImg = this.fileName;

    if (this.tokenExpired(this.tokenStorageData.getToken())) 
    {
      // token expired
      alert("Token Expired......Dead");
      this.router.navigate(['/authentication/signin']);
      this.tokenStorageData.signOut();
    } 
    else 
    {
      // token valid
      alert("Token Valid......alive");
      this.erpHttpClientsService.addProfessorDtls(addProfessorDtls)
      .subscribe(res => {
       console.log(res);
      },(err: HttpErrorResponse) => {
      alert("Employee is not Added Successfully");
     }); 
    }
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
   // alert(Math.floor((new Date).getTime() / 1000)+"       "+expiry);
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
