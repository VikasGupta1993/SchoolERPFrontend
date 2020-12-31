import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassSectionComponent } from './add-class-section.component';

describe('AddClassSectionComponent', () => {
  let component: AddClassSectionComponent;
  let fixture: ComponentFixture<AddClassSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
