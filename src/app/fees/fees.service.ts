import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  readonly APP_URL    = 'http://localhost:8080/fees';
    
  constructor(private http:HttpClient) { }

  public addFeesInstallmentData(addFeeInstData)
  {
    return this.http.post(this.APP_URL + '/addfeesinstallment',addFeeInstData);
  }
}
