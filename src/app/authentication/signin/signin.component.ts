import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { SigninDtls } from 'src/app/shared/models/signindetails';
import { ErpHttpClientsService } from 'src/app/core/services/erp-http-clients.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {TokenStorage} from '../../core/services/token.storage';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
    private erpHttpClientsService:ErpHttpClientsService,
    private tokenStorageData:TokenStorage
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit(signindtls : SigninDtls) 
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else 
    {
      this.erpHttpClientsService.isValidUser(signindtls)
      .subscribe(res => {
        console.log(res);
        if(res.statusCode == 200)
        {
          //alert(res.authenticationJwtResponse.token);
          this.tokenStorageData.saveToken(res.authenticationJwtResponse.token);
          this.router.navigate(['/dashboard/main']);
        }
        else
        {
          alert(res.desc);
          //this.loginForm.get("username").clearValidators();
          //this.loginForm.get("username").reset();
          //this.loginForm.get("password").clearValidators();
         //this.loginForm.get("password").reset();
        }
      },(err: HttpErrorResponse) => {
      alert("Employee is not Added Successfully");
      }); 
    }
  }
}
