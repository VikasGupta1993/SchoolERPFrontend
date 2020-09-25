import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { TokenStorage } from '../services/token.storage';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(TokenStorage)
    let tokenizedReq;
    if(authService.getToken() != null)
    {
      tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
        }
      )
    }
    else
     {
      tokenizedReq = req.clone()
     }
     return next.handle(tokenizedReq)
  }
}