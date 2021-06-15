import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DELETE_PROFESSOR, EDIT_PROFESSOR, GET_PROFESSOR_LIST, SAVE_PROFESSOR } from 'src/app/constants/url';
import { HttpService } from 'src/app/core/services/httpServices/http.service';
import { ProfessorModel } from 'src/app/store/professor/professor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) {}

  getProfessors() {
    return this.http.get(environment.apiUrl+GET_PROFESSOR_LIST);
  }
  saveProfessor(requestPayload: ProfessorModel) {
    return this.http.post(environment.apiUrl+SAVE_PROFESSOR,requestPayload);
  }
  updateProfessor(requestPayload:ProfessorModel) {
    return this.http.post(environment.apiUrl+ EDIT_PROFESSOR ,requestPayload)
  }
  deleteProfessor(id: string) {
    return this.http.post(DELETE_PROFESSOR, id);
  }
}
