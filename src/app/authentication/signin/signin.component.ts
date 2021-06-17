import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninDtls } from 'src/app/shared/models/signindetails';
import { ErpHttpClientsService } from 'src/app/core/services/erp-http-clients.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from '../../core/services/token.storage';
import { AuthenticationService } from '../service/authentication.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';


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
  token: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private utilityService:UtilityService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.removeItem('token');
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.doLogin(this.loginForm.value)
      .subscribe(res => {
        console.log(res);
        if (res.statusCode == 200) {
          this.token = res.authenticationJwtResponse.token;
          localStorage.setItem('token', this.token);
          this.utilityService.showSnackBar(res.desc);
          this.router.navigate(['/dashboard/main']);
        } else {
          this.utilityService.showSnackBar(res.desc);
        }
      }, (err: HttpErrorResponse) => {
        this.utilityService.showSnackBar(err.message);
             });
  }
}
