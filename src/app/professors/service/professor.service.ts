import { Injectable } from '@angular/core';
import { GET_PROFESSOR_LIST, SAVE_PROFESSOR } from 'src/app/constants/url';
import { HttpService } from 'src/app/core/services/httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpService) {}

  getProfessors() {
    return this.http.get(GET_PROFESSOR_LIST);
  }
  saveProfessor(requestPayload) {
    return this.http.post(SAVE_PROFESSOR,requestPayload);
  }
}
