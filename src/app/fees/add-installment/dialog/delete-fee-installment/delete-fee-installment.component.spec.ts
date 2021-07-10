import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeeInstallmentComponent } from './delete-fee-installment.component';

describe('DeleteFeeInstallmentComponent', () => {
  let component: DeleteFeeInstallmentComponent;
  let fixture: ComponentFixture<DeleteFeeInstallmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFeeInstallmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFeeInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
