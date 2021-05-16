import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { SignupDtls } from 'src/app/shared/models/signupdetails';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErpHttpClientsService } from 'src/app/core/services/erp-http-clients.service';
import { ErrorStateMatcher } from '@angular/material/core';

// Below class is used for match the password
//  export class MyErrorStateMatcher implements ErrorStateMatcher {
//    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//      const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//      const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

//      return (invalidCtrl || invalidParent);
//    }
//  }

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  show=false;
  //matcher = new MyErrorStateMatcher();
  signupForm: FormGroup;
  emailregex = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
    private erpHttpClientsService:ErpHttpClientsService
  ) {}



  ngOnInit() 
  {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5),Validators.pattern(this.emailregex)]],
      password: ['', [Validators.required]],
      cpassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.cpassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(signupdtls:SignupDtls) 
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) 
    {
      return;
    } 
    else 
    {
      var jsonData;
      var parseData;

      this.erpHttpClientsService.addnewuser(signupdtls)
      .subscribe(res => {

        jsonData = JSON.stringify(res);
        parseData = JSON.parse(jsonData);
        console.log(parseData.statusCode);
       if(parseData.statusCode == 200)
       {
        alert("User has been added successfully");
        //this.router.navigate(['/dashboard/main']);
       }
       else
       {
        alert("User already exists,Try with different User"); 
       } 
      
      },(err: HttpErrorResponse) => {
      alert("Employee is not Added Successfully");
      }); 
    }
  }

  onSearchChange(searchValue: string,sv1: string): void {  
    if(searchValue === sv1)
    {
      this.show = true;
    }
  }
}
