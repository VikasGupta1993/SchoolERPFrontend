import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeeTypeComponent } from './delete-fee-type.component';

describe('DeleteFeeTypeComponent', () => {
  let component: DeleteFeeTypeComponent;
  let fixture: ComponentFixture<DeleteFeeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFeeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
