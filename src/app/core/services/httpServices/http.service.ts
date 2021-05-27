import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from 'src/app/constants/loader/loader.service';
import { ApiResponse } from 'src/app/common/common-models';
import { environment } from "src/environments/environment";
 

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private apiUrl: string;

  constructor(private http: HttpClient, private _loaderService: LoaderService) {
    this.apiUrl = environment.apiUrl;
  }

  // post<T>(url, data, loader = true): Observable<ApiResponse<T>> {
  post<T>(url, data, loader=true): Observable<any> {
    if (loader) {
      // this._loaderService.loader.next(loader);
    }
    return this.http.post<any>(this.apiUrl + url, data);
  }

  put<T>(url, data?, loader = true): Observable<ApiResponse<T>> {
    if (loader) {
      // this._loaderService.loader.next(loader);
    }
    return this.http.put<ApiResponse<T>>(this.apiUrl + url, data);
  }

  delete<T>(url, query?: any, loader = true): Observable<ApiResponse<T>> {
    if (loader) {
      // this._loaderService.loader.next(loader);
    }
    return this.http.delete<ApiResponse<T>>(this.apiUrl + url, { params: query });
  }

  patch<T>(url, data, loader = true): Observable<ApiResponse<T>> {
    if (loader) {
      // this._loaderService.loader.next(loader);
    }
    return this.http.patch<ApiResponse<T>>(this.apiUrl + url, data);
  }

  getBlobRequest(url, httpParams?: any, loader = true): Observable<Blob> {
    if (loader) {
      // this._loaderService.loader.next(loader);
    }
    for (let item in httpParams) {
      if (
        httpParams[item] === "" ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    return this.http.get(this.apiUrl + url, {
      params: httpParams,
      responseType: "blob",
    });
  }

  get<T>(url, httpParams?: any, loader = true): Observable<ApiResponse<T>> {
    if (loader) {
      // this._loaderService.loader.next(loader);
    }
    for (let item in httpParams) {
      if (
        httpParams[item] === "" ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    const header = {};
    if (httpParams) {
      header["params"] = httpParams;
    }
    return this.http.get<ApiResponse<T>>(this.apiUrl + url, header);
  }
}
