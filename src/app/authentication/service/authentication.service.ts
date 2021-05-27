import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpService) { }

  public doLogin(signindata) {
    return this.http.post('/authenticateUser',signindata);
   }
}
