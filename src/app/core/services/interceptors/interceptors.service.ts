import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/constants/loader/loader.service';
import { UtilityService } from '../utility/utility.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService {

  private totalRequests: any;
  token: any;
  private unAuthorisedCodes = [401, 423, 440, 498, 403];

  constructor(private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService,
    private loaderService: LoaderService) {
    this.initInitials()
  }

  initInitials() {
    this.totalRequests = 0;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // https://digitalwealthdevelopapi.appskeeper.in/v1/messages/fetch-message-list
    if (request.url != environment.apiUrl + '/v1/messages/fetch-message-list' && request.url != environment.apiUrl + '/v1/users/investor-store') {
      this.loaderService.showLoader(true);
    }



    else {
      this.loaderService.showLoader(false);
    }

    this.totalRequests++;
    let headersToken;
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : localStorage.getItem('authToken');
    // headers['device_token'] = 
    // if (localStorage.getItem('operation')) {
    //   headers['operation'] = localStorage.getItem('operation')
    // }
    if (!this.token) {
      // headers['source'] = 'web';
      // headers['platform'] = navigator.appCodeName;
      // headers['uuid'] = localStorage.getItem('uuid');
      // headers['user_type'] = '3';
      // headers['ip'] = localStorage.getItem('ip');
    } else {
      headersToken = 'Bearer '+this.token
      // headers['source'] = 'web';
      // headers['platform'] = navigator.appCodeName;
      // headers['uuid'] = localStorage.getItem('uuid');
      // headers['user_type'] = '3';
      // headers['ip'] = localStorage.getItem('ip');
    }
    request = request.clone({
      headers: new HttpHeaders({
      'Authorization': headersToken
      })
    });

    return next.handle(request).pipe(
      tap(
        (data) => {
          if (data instanceof HttpResponse) {
            this.decreaseRequests();
            this.loaderService.showLoader(false);
            if (data.body.code == 403) {
              {
                this.utilityService.showSnackBar("Your Session has been expired. Please try after Sometime!")
                localStorage.clear()
                // this.router.navigate([LOGIN])
              }
            }
          }
        },
        (err: any) => {
          this.decreaseRequests();
          if (err instanceof HttpErrorResponse) {
            if (err.status == 0) {
              this.utilityService.showSnackBar('Please check your internet connection')
            }
            if (err.status === 0) {
              //   this._toast.warning('Please check your internet connection and try again later.');
            } else if (this.unAuthorisedCodes.includes(err.status)) {
              //clearToken();
              //this.router.navigate([LOGIN.fullUrl]);
              this.utilityService.showSnackBar(err.error.message);
              return;
            } else if (err.status === 504) {
              //   this._toast.warning('API Server is not working!');
            }
            //this._toast.error(err.error.message);
          }
          this.loaderService.showLoader(false);
        }
      )
    );
  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      setTimeout(() => {
        this.loaderService.showLoader(false);
      }, 0);
    }
  }
}
