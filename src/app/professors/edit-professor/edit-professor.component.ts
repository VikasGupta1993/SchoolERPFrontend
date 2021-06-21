import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProfessorModel } from 'src/app/store/professor/professor';
import { ProfessorAction } from 'src/app/store/professor/professor.action';
import { ProfessorState } from 'src/app/store/professor/professor.state';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.sass'],
})
export class EditProfessorComponent {
  proForm: FormGroup;
  @Select(ProfessorState.getProfessorList) todos$: Observable<ProfessorModel[]>;
  formdata = {
    first: '',
    last: '',
    gender: '',
    mobile: '',
    password: '',
    conformPassword: '',
    email: '',
    designation: '',
    department: '',
    address: '',
    dob: '',
    education: '',
    uploadImg: '',
  };
  professorList: ProfessorModel[];
  constructor(private fb: FormBuilder, private store: Store) {
    this.proForm = this.createContactForm();
    this.store.dispatch(new ProfessorAction.GetProfessorList());
  }

  ngOnInit() {
    //  this.loadData();
    if(this.todos$) {
      this.todos$.subscribe(res => {
        this.professorList = res;
        //  console.log(this.professorList);
         this.setFormData();
       })
       }
    }
  onSubmit() {
    console.log('Form Value', this.proForm.value);
    if(this.proForm.valid) {
      this.store.dispatch(new ProfessorAction.UpdateProfessor(this.proForm.value,'professors/all-professor'));
    }
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id:[''],
      firstname: [ '', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastname: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: [''],
      conformPassword: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      designation: [''],
      department: [''],
      address: [''],
      dob: ['', [Validators.required]],
      education: [''],
      uploadImg: [''],
    });
  }
  setFormData() {
    if(this.professorList) {
      this.professorList.forEach(data => {
         this.proForm.get('id').setValue(data.id);
         this.proForm.get('firstname').setValue(data.firstname);
         this.proForm.get('lastname').setValue(data.lastname);
         this.proForm.get('gender').setValue(data.gender);
         this.proForm.get('mobile').setValue(data.mobile);
         this.proForm.get('password').setValue(data.password);
         this.proForm.get('conformPassword').setValue(data.conformPassword);
         this.proForm.get('email').setValue(data.email);
         this.proForm.get('designation').setValue(data.designation);
         this.proForm.get('department').setValue(data.department);
         this.proForm.get('address').setValue(data.address);
         this.proForm.get('dob').setValue(data.dob);
         this.proForm.get('education').setValue(data.education);
         this.proForm.get('uploadImg').setValue('');
        //  this.proForm.get('address').setValue(data.address);
      })
    }
  }
}
