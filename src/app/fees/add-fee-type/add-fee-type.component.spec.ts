import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeTypeComponent } from './add-fee-type.component';

describe('AddFeeTypeComponent', () => {
  let component: AddFeeTypeComponent;
  let fixture: ComponentFixture<AddFeeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
