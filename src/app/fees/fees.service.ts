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

  public getAllInstallmentMonth()
  {
    return this.http.get(this.APP_URL + '/getAllInstallmentMonth',{responseType: 'text'});
  }

  public getFeeInstallmentList()
  {
    return this.http.get(this.APP_URL + '/getFeeInstallmentList');
  }

  public deleteFeeInstallment(rowId : any)
  {
    return this.http.delete(this.APP_URL + `/deleteFeeInstallment/`+rowId);
  }

  public editFeeInstallmentRow(editFeesInstallmentData)
  {
    return this.http.put(this.APP_URL + '/editFeeInstallmentRow',editFeesInstallmentData);
  }

  // Fee type Services.

  public addFeeComponentData(addFeeTypeComponentData)
  {
    return this.http.post(this.APP_URL + '/addFeeComponent',addFeeTypeComponentData);
  }

  public getFeeTypeComponentData()
  {
    return this.http.get(this.APP_URL + '/getFeeTypeComponentData');
  }

  public deleteFeeTypeComponent(rowId : any)
  {
    return this.http.delete(this.APP_URL + `/deleteFeeTypeComponent/`+rowId);
  }

  public editFeeTypeComponent(editFeeTypeinfo)
  {
    return this.http.put(this.APP_URL + '/editFeeTypeComponent',editFeeTypeinfo);
  }
}
