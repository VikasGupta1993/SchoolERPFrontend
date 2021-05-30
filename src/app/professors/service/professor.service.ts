import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_PROFESSOR_LIST, SAVE_PROFESSOR } from 'src/app/constants/url';
import { HttpService } from 'src/app/core/services/httpServices/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) {}

  getProfessors() {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'token': `Bearer ${localStorage.getItem('token')}`,
    //      'content-type':'application/json'
    //   })
    // };
    return this.http.get(environment.apiUrl+GET_PROFESSOR_LIST);
  }
  saveProfessor(requestPayload) {
    return this.http.post(SAVE_PROFESSOR,requestPayload);
  }
}
