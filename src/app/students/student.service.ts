import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly APP_URL    = 'http://localhost:8080/student';

  constructor(private http:HttpClient) { }
  
  public addNewStudent(formData)
  {
    return this.http.post(this.APP_URL + '/addstudent',formData);
  }
}
