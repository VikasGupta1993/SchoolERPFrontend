import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/constants/loader/loader.service';
import { UtilityService } from '../utility/utility.service';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of} from 'rxjs';

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
  }
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if(localStorage.getItem('token')) {
  //   let token = localStorage.getItem('token');
  //   request = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }
  //   return next.handle(request).pipe(
  //     catchError(
  //       (err, caught) => {
  //         if (err.status === 401){
  //           this.handleAuthError();
  //           return of(err);
  //         } else if(err.status) {
               
  //         }
  //         throw err;
  //       }
  //     )
  //   );
  // }
  intercept(req, next) {
    // let authService = this.injector.get(TokenStorage)
    let authToken = localStorage.getItem('token');
    let tokenizedReq;
    if(authToken != null)
    {
      tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        }
      )
    }
    else
     {
      tokenizedReq = req.clone()
     }
     return next.handle(tokenizedReq)
  }

  private handleAuthError() {
    localStorage.removeItem('token');
    this.utilityService.showSnackBar('Auth token has been expired');
    this.router.navigateByUrl('/authentication/signin');
  }
}
