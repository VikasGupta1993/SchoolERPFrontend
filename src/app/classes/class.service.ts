import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  readonly APP_URL    = 'http://localhost:8080/class';
  readonly APP_URLs   = 'http://localhost:8080/section';
  readonly APP_URLss  = 'http://localhost:8080/class_section';

  constructor(private http:HttpClient) {}

   public addNewClassData(addClassData)
   {
     return this.http.post(this.APP_URL + '/addclass',addClassData);
   }

   public deleteClassData(rowId: any) 
   {
    return this.http.delete(this.APP_URL + `/deleteclass/`+rowId);
   }

   public getAllClassList(){
    return this.http.get(this.APP_URL + '/getAllClasses');
   }

   public editClassDatainfo(editClassinfoData)
   {
     return this.http.put(this.APP_URL + '/editclass',editClassinfoData);
   }


   // Section Crud Operation

   public addNewSectionData(addSectionData)
   {
     return this.http.post(this.APP_URLs + '/addsection',addSectionData);
   }

   public deleteSectionData(rowId: any) 
   {
    return this.http.delete(this.APP_URLs + `/deletesection/`+rowId);
   }

   public getAllSectionList(){
    return this.http.get(this.APP_URLs + '/getallsection');
   }

   public editSectionDatainfo(editSectioninfoData)
   {
     return this.http.put(this.APP_URLs + '/editsection',editSectioninfoData);
   }

   // Add Class-Section Operation
   
   public addNewClassSectionData(addClassSecData)
   {
     return this.http.post(this.APP_URLss + '/saveClassSection',addClassSecData);
   }

   public deleteClassSectionData(rowId: any) 
   {
    return this.http.delete(this.APP_URLss + `/deleteClassSection/`+rowId);
   }

   public getAllClassSectionList(){
    return this.http.get(this.APP_URLss + '/getAllClassSection');
   }

   public editClassSectionDatainfo(editClassSectionInfo)
   {
     return this.http.put(this.APP_URLss + '/editClassSection',editClassSectionInfo);
   }
}